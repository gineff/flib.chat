/* eslint-disable no-new-func */
/* eslint-disable no-lonely-if */
/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
import { getContext, setContext, uid } from "./index";
import Dom from "./dom";
import EventBus from "./EventBus";

//              1           2                3         4                5
// re =      <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag>
const reComponent =
  /<([A-Z][A-Za-z0-9._]+)\s*([^>]*)\s*\/>|<(?<tag>[A-Z][A-Za-z0-9._]+)\s*([^>]*)\s*>(.*?)<\/\k<tag>\s?>|context:(\d+)/;
const ternaryOperatorRe = /\{\{\s*([^}]*)\?(?!\.)\s*(.*?)\s*:\s*(.*?)\s*\}\}/g;

const propsRegexp = /(\w+)\s*=\s*((?<quote>["'`])(.*?)\k<quote>|context:(\d+))|(\w+)/g;
const components = new Map();
type Events = Values<typeof Component.EVENTS>;

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
  const collection = [];
 
  while ((match = block.match(reComponent))) {
    const [found, singleTag, singleTagProps, pairedTag, pairedTagProps, children, context] = match;
    let component;

    if (context) {
      component = getContext(Number(context));
    } else {
      const props = parseProps(singleTagProps || pairedTagProps);
      try{
        component = new (components.get(singleTag || pairedTag))({ ...props, children });
      }catch(e) {
        console.error("не зарегистрирован компоенет ", singleTag || pairedTag)
      }
    }
    const id: number = collection.push(Array.isArray(component)? component : [component]) - 1;
    block = block.replace(found, `<div component-id="${id}" ></div>`);
  }

  const response : [string, Array<typeof Component[]>] = [block, collection];
  return  response;
}

function registerComponent(key: string, value: typeof Component): void {
  components.set(key, value);
}
/* **************************
          Component
*************************** */

export default class Component<P = any> {

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;


  public id = uid();
  protected template: string = "<div>{{children}}</div>";
  protected readonly props: P;
  protected block!: string;
  protected element: HTMLDivElement = document.createElement("div");
  public state: any = {};
  public isComponent = true;
  protected refs: { [key: string]: Component } = {};
  eventBus: () => EventBus<Events>;
  tag = this.constructor.name;

  constructor(props: P) {
    const initialState : Record<string, any> = {};
    const entries =  Object.entries(props);
    
    const {template, ...rest} = props;
    this.template = template || this.template;

    Object.entries(rest).forEach(([key, value]) => {
      if (value && isComponent(value)) {
        registerComponent(key, value)
      } else {
        initialState[key] = value;
      }
    });

    this.setState(initialState);

    const eventBus = new EventBus<Events>();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    this.props = this._makePropsProxy(props || ({} as P));
    this.state = this._makePropsProxy(this.state);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {}

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }


  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };
/*
  setState(key: string, value: any): void {
    this.state[key] = value;
  }
*/
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

  public render() {
    const newElement = this._render();
    this.element.replaceWith(newElement);
    this.element = newElement;
    this.addEventHandler(this.element, this.state);
    return this.element;
  }

  _render() {
    const block = this._compile(this.template).replace(/\n|\s{2}/g, "");
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

  _makePropsProxy(props: any): any {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        // self.eventBus().emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    }) as unknown as P;
  }
}
