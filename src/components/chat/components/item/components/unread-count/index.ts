/* eslint-disable camelcase */
import Component from "../../../../../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class UnreadCount extends Component {
  constructor(props: P) {
    super({...props, template})
  }

  render(): void {
    const { unreadCount } = this.props;
    const hidden = unreadCount > 0 ? "" : "hidden"
    this.setState({ unreadCount, hidden}) 
    super.render();
  }
}
