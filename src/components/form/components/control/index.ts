import Component from "../../../../utils/component";
import { stringifyProps } from "../../../../utils";
import template from "./index.tem";
import "./index.css";

export default class Control extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }

  render(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, children, ...rest } = this.props;
    this.setState({ className, rest: stringifyProps(rest) });
    super.render();
  }
}
