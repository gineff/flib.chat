/* eslint-disable no-new-func */
/* eslint-disable no-lonely-if */
/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
import { getContext, setContext } from "./index";
import Dom from "./dom";

//              1           2                3         4                5
// re =      <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag>
const reComponent =
  /<([A-Z][A-Za-z0-9._]+)\s*([^>]*)\s*\/>|<(?<tag>[A-Z][A-Za-z0-9._]+)\s*([^>]*)\s*>(.*?)<\/\k<tag>\s?>|context:(\d+)/;
const ternaryOperatorRe = /\{\{\s*([^}]*)\?(?!\.)\s*(.*?)\s*:\s*(.*?)\s*\}\}/g;

const propsRegexp = /(\w+)\s*=\s*((?<quote>["'`])(.*?)\k<quote>|context:(\d+))|(\w+)/g;
const components = new Map();

function getValue(path: string, obj: any): any {
  const keys = path.trim().split(".");
  let result = obj;

  try {
    for (const key of keys) {
      const match = key.match(/^(\w+)\[(\d+)\]$/);
      if (match) {
        result = result[match[1]][match[2]];
      } else {
        result = result[key];
      }
    }
    return result;
  } catch (e) {
    return undefined;
  }
}

function parsePropsFromString(str: string): P {

  let props = {};
  const matches = str.matchAll(propsRegexp);

  for (const match of matches) {
    const [, key, , , value, contextId, attribute] = match;

    if(attribute) {
      props = {...props, attribute}
    }else{
      props = {...props, [key]: (contextId ? getContext(Number(contextId)) : value)}
    }
  }
  return props;
}

function parseProps(str: string): P | null {
  return str ? parsePropsFromString(str) : null;
}

function isComponent(element: any): boolean {
  return Object.getPrototypeOf(element) === Component;
}

function isPrimitive(element: any): boolean {
  return Object(element) !== element;
}

function decomposeBlock(block: string)  {
  let match;
  const collection :  Array<typeof Component[]>= [];
  while ((match = block.match(reComponent))) {
    const [found, singleTag, singleTagProps, pairedTag, pairedTagProps, children, context] = match;
    let component;

    if (context) {
      component = getContext(Number(context));
    } else {
      const props = parseProps(singleTagProps || pairedTagProps);
      component = new (components.get(singleTag || pairedTag))({ ...props, children });
    }
    const id = collection.push(Array.isArray(component)? component : [component]) - 1;
    block = block.replace(found, `<div component-id="${id}" ></div>`);
  }
  return [block, collection];
}

function registerComponent(key: string, value: typeof Component): void {
  components.set(key, value);
}
/* **************************
          Component
*************************** */

export default class Component {
  template = "<div>{{children}}</div>";

  block : string = "";

  element = document.createElement("div");

  isComponent = true;

  state = {};



  tag = this.constructor.name;

  constructor({ template, ...rest }) {
    this.template = template || this.template ;
    Object.entries(rest).forEach(([key, value]) => {
      if (value && isComponent(value)) {
        registerComponent(key, value)
      } else {
        this.setState(key, typeof value === "function" ? value.bind(this) : value);
      }
    });
  }

  setState(key: string, value: any): void {
    this.state[key] = value;
  }

  _compile(template) {
    if (!template) console.error(this.constructor.name, " отсутствует шаблон");

    template = template.replace(ternaryOperatorRe, (match, condition, value1, value2) => {
      const result = new Function(`return ${condition}`).call(this.state) ? value1 : value2;
      return result.replace(/null|undefined/g, "");
    });

    return template.replace(/\{\{\s*([A-Za-z0-9._-]+)\s*\}\}/g, (match, key) => {
      const value = getValue(key, this.state);

      if (!value == undefined || value == null) {
        return " ";
      }
      if (isPrimitive(value)) {
        return value;
      }
      return `context:${setContext(value)}`;
    });
  }

  render() {
    const newElement = this._render();
    this.element.replaceWith(newElement);
    this.element = newElement;
    this.addEventHandler(this.element, this.state);
    return this.element;
  }

  _render() {
    const block : string= this._compile(this.template).replace(/\n|\s{2}/g, "");
    this.block = block;

    // ToDo Ошибка если мужду Тегом и именем аттрибута более одного пробела. Пробел схлоывается <Message  name= -> <Mesaagename
    const [htmlTree, nestedComponents] = decomposeBlock(block);
    const dom = new Dom(htmlTree);

    // Object.entries(nestedComponents).forEach(([id, nested]) => {
    nestedComponents.forEach((nested, id) => {
      
      const domElement = dom.querySelector(`[component-id="${id}"]`);
      domElement.replaceWith(...nested.map((comp) => comp.render()));
      

    });

    return dom.getElement();
  }

  // eslint-disable-next-line class-methods-use-this
  addEventHandler(element: HTMLElement, props: P) {
    Object.entries(props).forEach(([key, handler]) => {
       if (typeof handler !== "function") return;

      let match;
      if(match = key.match(/^on(\w+)/)) {
        const eventKey = match[1].toLowerCase();
        element.addEventListener(eventKey, handler, { capture: true });
      }
    });
  }
}
