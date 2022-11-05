/* eslint-disable camelcase */
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
  render(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if(this.state?.unreadCount > 0) {
      super.render();
    }
  }
}
