import Component from "../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class Button extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }

  getStateFromProps(): void {
    const { title, children } = this.props;
    this.state = { ...this.props, children: title || children };
  }
}
