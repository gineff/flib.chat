import Component from "../../utils/component";
import { stringifyProps } from "utils";
import template from "./index.tem";
import "./index.css";

export default class Button extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }

  getStateFromProps(): void {
    const { title, children, variant, className, href, onClick, ...rest } = this.props;
    this.state = {
      variant,
      className,
      href,
      rest: stringifyProps(Object.fromEntries(Object.entries(rest).filter((el) => typeof el[1] !== "function"))),
      children: title || children,
      onClick,
    };
  }
}
