/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import Component from "./component";

const useContext = (provider) => provider.state;

export { useContext };

const Provider = class Provider extends Component {
  _element = new DocumentFragment();

  constructor(props) {
    super(props);
    Provider.state = { ...Provider.state, ...props };
  }


  render() {
    const newElement = this._render();
    const nodesFragment = document.createDocumentFragment();
    nodesFragment.append(...newElement.childNodes);
    this.element = nodesFragment;
    return this.element;
  }
};

export default function createContext(defaultValue) {
  Provider.state = defaultValue;
  return Provider;
}
