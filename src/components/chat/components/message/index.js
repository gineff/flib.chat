import Component from "../../../../utils/component";
import MessageTime from "../../../date";
import template from "./index.tem";
import "./index.css";

export default class Message extends Component {
  constructor(props) {
    super({ ...props, MessageTime, template });
  }

  render() {
    // console.log(this);
    const { content, file } = this.state;
    this.state = {
      ...this.state,
      content: content.replace(/\n/g, "<br>"),
      hasMedia: file ? "hasMedia" : null,
      hasContent: content ? "hasContent" : null,
    };
    return super.render();
  }
}
