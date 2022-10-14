import Component from "./component";

//ToDo "Provider" относится к значению, но здесь используется как тип. Возможно, вы имели в виду "typeof Provider"?
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const useContext = (provider: Provider) => provider.context;

export { useContext };

const Provider = class Provider extends Component {
  static context: Record<string, unknown>;
  constructor(props: P) {
    super(props);
    Provider.context = { ...Provider.context, ...props };
  }

  defineElement(newElement: Node) {
    const nodesFragment = document.createDocumentFragment();
    nodesFragment.append(...newElement.childNodes);
    this.element = nodesFragment as unknown as HTMLDivElement;
  }
};

export default function createContext(defaultValue: Record<string, unknown>) {
  Provider.context = defaultValue;
  return Provider;
}
