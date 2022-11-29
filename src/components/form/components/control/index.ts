import Component from "../../../../utils/component";
import { stringifyProps } from "../../../../utils";
import template from "./index.tem";
import "./index.css";

export default class Control extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }

  getStateFromProps(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, children, ...rest } = this.props;
    this.setState({
      ...this.props,
      rest: stringifyProps(Object.fromEntries(Object.entries(rest).filter((el) => typeof el[1] !== "function"))),
    });
  }
}
