import Component from "../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class Button extends Component {
  protected template = template;
  render() {
    const { title, children } = this.state;
    this.state.title = title || children;
    return super.render();
  }
}
