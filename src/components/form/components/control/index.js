import Component from "../../../../utils/component";
import { stringifyProps } from "../../../../utils";
import template from "./index.tem";
import "./index.css";

export default class Control extends Component {
  constructor(props) {
    super({ ...props, template });
  }

  render() {
    const { className, children, ...rest } = this.state;
    this.state.rest = stringifyProps(rest);
    return super.render();
  }
}
