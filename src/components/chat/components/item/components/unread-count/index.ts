/* eslint-disable camelcase */
import Component from "../../../../../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class UnreadCount extends Component {
  template = template;
  render() {
    const { unreadCount } = this.props;
    this.props = { ...this.props, hidden: unreadCount > 0 ? "" : "hidden" };
    return super.render();
  }
}
