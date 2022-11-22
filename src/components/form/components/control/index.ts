import Component from "../../../../utils/component";
import { stringifyProps } from "../../../../utils";
import template from "./index.tem";
import "./index.css";

export default class Control extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }

  getStateFromProps(): void {
    const { className, children, ...rest } = this.props;
    this.setState({
      className,
      rest: stringifyProps(Object.fromEntries(Object.entries(rest).filter((el) => typeof el[1] !== "function"))),
    });
  }
}
