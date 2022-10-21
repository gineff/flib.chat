import Component from "./component";

export default class Provider extends Component {
  public getContent() {
    const nodesFragment = document.createDocumentFragment();
    nodesFragment.append(...this.element.childNodes);
    return nodesFragment;
  }
}
