/* eslint-disable camelcase */
import Component from "../../../../../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class UnreadCount extends Component {
  constructor(props) {
    super({ ...props, template });
  }

  render() {
    const { unreadCount } = this.state;
    this.state = { ...this.state, hidden: unreadCount > 0 ? "" : "hidden" };
    return super.render();
  }
}
