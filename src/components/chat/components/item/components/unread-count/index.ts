import Component from "../../../../../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class UnreadCount extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }
  getStateFromProps(): void {
    const { unreadCount } = this.props;
    this.setState({ unreadCount });
  }
  _render(): void {
    const {unreadCount} = this.state as {unreadCount: number}
    if(unreadCount > 0) {
      super._render();
    }
  }
}
