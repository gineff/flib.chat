import Component from "../../../../utils/component";
import MessageTime from "../../../date";
import template from "./index.tem";
import "./index.css";

export default class Message extends Component {
  constructor(props: P) {
    super({ ...props, template, MessageTime });
  }
  getStateFromProps(): void {
    const { content, file } = this.props;
    const resources = "https://ya-praktikum.tech/api/v2/resources";

    if (file) {
      this.setState({
        ...this.props,
        resources,
        hasMedia: file ? "hasMedia" : null,
      });
    } else {
      this.setState({
        ...this.props,
        content: "" + content?.replace(/\n/g, "<br>"),
        hasContent: content ? "hasContent" : null,
      });
    }
  }
}
