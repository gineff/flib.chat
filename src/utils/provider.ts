import Component from "./component";

export default class Provider extends Component {
  public getContent() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    const nodesFragment = document.createDocumentFragment();
    nodesFragment.append(...this.element.childNodes);
    return nodesFragment;
  }
}
