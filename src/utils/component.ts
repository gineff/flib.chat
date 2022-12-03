import { getContext, setContext, uid, getValue } from "./index";
import Dom from "./dom";
import EventBus from "./EventBus";
import isEqual from "./isEqual";
//              1           2                3         4                5
// re =      <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag>
export const reComponent =
  /<([A-Z][A-Za-z0-9._]+)\s*([^>]*)\s*\/>|<(?<tag>[A-Z][A-Za-z0-9._]+)\s*([^>]*)\s*>(.*?)<\/\k<tag>\s?>|context:(\d+)/;
const ternaryOperatorRe = /\{\{\s*([^}]*)\s*\?\s+([\s\S]*?)\s*:\s+([\s\S]*?)\s*\}\}/gm;

const propsRegexp = /([\w\d-]+)\s*=\s*((?<quote>["'`])([\s\S]*?)\k<quote>|context:(\d+))|(\w+)/g;
const components = new Map();
type Events = Values<typeof Component.EVENTS>;

export interface ComponentClass<T> extends Function {
  new (props: P): Component<T>;
}

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function parsePropsFromString(str: string): P {
  let props = {};
  const matches = str.matchAll(propsRegexp);

  for (const match of matches) {
    const [, key, , , value, contextId, attribute] = match;

    if (attribute) {
      props = { ...props, attribute };
    } else if (contextId) {
      const context = getContext(Number(contextId));
      if ((context as typeof Component)?.isComponent) {
        continue;
      }
      props = { ...props, [key]: context };
    } else {
      props = { ...props, [key]: value };
    }
  }
  return props;
}

export function parseProps(str: string): P | null {
  return str ? parsePropsFromString(str) : null;
}

function isPrimitive(element: unknown): boolean {
  return Object(element) !== element;
}

function registerComponent(key: string, value: typeof Component): void {
  components.set(key, value);
}
/* **************************
          Component
*************************** */

export default class Component<P = unknown> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CWU: "flow:component-will-unmount",
    FLOW_RENDER: "flow:render",
  } as const;

  public id = uid();
  protected template = "<div>{{children}}</div>";
  protected block!: string;
  protected element: HTMLDivElement = document.createElement("div");
  protected props: any;
  public state = {};
  static isComponent = true;
  refs: { [key: string]: HTMLElement } = {};
  eventBus: () => EventBus<Events>;
  tag = this.constructor.name;

  /* **************************
            constructor
  *************************** */

  constructor(props?: P) {
    const pureProps: { [key: string]: unknown } = {};

    for (const key in props) {
      const value: unknown = props[key];

      if (typeof value === "object" && value !== null && "isComponent" in value) {
        registerComponent(key, value as unknown as typeof Component);
      } else if (key === "template") {
        this.template = value as string;
      } else {
        pureProps[key] = value;
      }
    }

    this.props = pureProps;
    this.getStateFromProps();

    // this.props = this._makePropsProxy(this.props);

    const eventBus = new EventBus<Events>();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT);
  }

  _checkInDom() {
    const elementInDOM = document.body.contains(this.element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Component.EVENTS.FLOW_CWU, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /* *Init* */
  init() {
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  /* *WillUnmount* */
  _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  componentWillUnmount() {
    ("");
  }
  /* *DidMount* */
  _componentDidMount(props: P) {
    this._checkInDom();

    this.componentDidMount(props);
  }

  componentDidMount(_props: P) {
    return _props;
  }

  /* *DidUpdate* */
  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    return !this.isEqual(oldProps, newProps);
  }

  isEqual(value: P, other: P) {
    return isEqual(value as PlainObject, other as PlainObject);
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  setState = (nextState: unknown) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state || ((this.state = {}), this.state), nextState);
  };

  _compile(template: string) {
    if (!template) console.error(this.constructor.name, " отсутствует шаблон");

    template = template.replace(/\{\{\s*([A-Za-z0-9._-]+)\s*\}\}/g, (_match: string, key: string): string => {
      const value = getValue(key, this.state);
      if (!value == undefined || value == null) {
        return " ";
      }
      if (isPrimitive(value)) {
        return String(value);
      }
      return `context:${setContext(value)}`;
    });
    template = template.replace(ternaryOperatorRe, (_match, condition, value1, value2) => {
      const result = new Function(`return ${condition}`).call(this.state) ? value1 : value2;
      return result.replace(/null|undefined/g, "");
    });
    return template;
  }

  defineElement(newElement: Node) {
    this.element.replaceWith(newElement);
    this.element = newElement as HTMLDivElement;
  }

  decomposeBlock<C extends Component>(block: string) {
    let match;
    const collection: Array<C[]> = [];

    while ((match = block.match(reComponent))) {
      const [found, singleTag, singleTagProps, pairedTag, pairedTagProps, children, context] = match;

      let component: C | undefined;

      if (context) {
        component = getContext(Number(context)) as C;
      } else {
        const props = parseProps(singleTagProps || pairedTagProps);
        component = new (components.get(singleTag || pairedTag))({ ...props, children }) as C;
      }

      if (!component) continue;

      const id: number = collection.push(Array.isArray(component) ? component : [component]) - 1;
      block = block.replace(found, `<div component-id="${id}" ></div>`);
    }

    const response: [string, C[][]] = [block, collection];
    return response;
  }

  getStateFromProps() {
    if (Object.keys(this.state).length === 0 && Object.keys(this.props).length > 0) {
      this.state = { ...this.props };
    }
  }

  render() {
    return this.template;
  }

  _render() {
    const block: string = this._compile(this.render()).replace(/\n|\s{2}/g, "");
    this.block = block;
    const [htmlTree, nestedComponents] = this.decomposeBlock(block);

    const dom = new Dom(htmlTree);
    nestedComponents.forEach((nested, id) => {
      const stub = dom.querySelector(`[component-id="${id}"]`);
      if (!stub) return;
      stub.replaceWith(
        ...nested.map((comp) => {
          return comp.getContent();
        })
      );
    });

    this.defineElement(dom.getElement() as Node);
    //this.addEventHandler(this.element, this.props);
    this.addEventHandler(this.element, this.state);
    //this.proxyPropsOnce();
    this.proxyStateOnce();
  }

  proxyStateOnce() {
    this.state = this._makePropsProxy(this.state);
    this.proxyStateOnce = (): void => {
      ("");
    };
  }

  addEventHandler(element: HTMLElement, props: any) {
    for (const key in props) {
      const handler = props[key];
      if (typeof handler !== "function") continue;
      let match;
      if ((match = key.match(/^on(\w+)/))) {
        const eventKey = match[1].toLowerCase();
        element.addEventListener(eventKey, handler as EventListenerOrEventListenerObject, { capture: true });
      }
    }
  }

  public getContent(): HTMLElement | DocumentFragment {
    setTimeout(() => {
      this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    }, 100);

    return this.element;
  }

  _makePropsProxy(props: any) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const prev = { ...target };
        target[prop] = value;
        self.eventBus().emit(Component.EVENTS.FLOW_CDU, prev, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  show() {
    const content = this.getContent();
    if (content instanceof HTMLElement) {
      content.style.display = "block";
    }
  }

  hide() {
    const content = this.getContent();
    if (content instanceof HTMLElement) {
      content.style.display = "none";
    }
  }
}
