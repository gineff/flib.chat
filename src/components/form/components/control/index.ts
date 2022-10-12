import Component from "../../../../utils/component";
import { stringifyProps } from "../../../../utils";
import template from "./index.tem";
import "./index.css";

export default class Control extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }

  render(): void {
    const { className, children, ...rest } = this.props;
    this.setState({ ...this.props, rest: stringifyProps(rest) });
    super.render();
  }
}
