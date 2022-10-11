/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import Component from "./component";

//@ts-ignore
const useContext = (provider: Provider) => provider.context;

export { useContext };

const Provider = class Provider extends Component {
  static context: P;
  constructor(props: P) {
    super(props);
    Provider.context = { ...Provider.context, ...props };
  }


  render() {
    const newElement = this._render();
    const nodesFragment = document.createDocumentFragment();
    nodesFragment.append(...newElement!.childNodes);
    //@ts-ignore
    this.element  = nodesFragment;
    return this.element;
  }
};

export default function createContext(defaultValue: any) {
  Provider.context = defaultValue;
  return Provider;
}
