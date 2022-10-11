import Component from "../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class Button extends Component {
  protected template = template;

  render() {
    const { title, children } = this.props;
    this.props.title = title || children;
    return super.render();
  }
}
