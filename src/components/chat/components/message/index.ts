import Component from "../../../../utils/component";
import MessageTime from "../../../date";
import template from "./index.tem";
import "./index.css";

export default class Message extends Component {
  constructor(props: P) {
    super({ ...props, template, MessageTime });
  }

  render() {
    const { content, file } = this.props;
    this.setState({
      ...this.props,
      content: content.replace(/\n/g, "<br>"),
      hasMedia: file ? "hasMedia" : null,
      hasContent: content ? "hasContent" : null,
    });
    super.render();
  }
}
