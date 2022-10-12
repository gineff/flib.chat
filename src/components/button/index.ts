import Component from "../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class Button extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }

  render(): void {
    const { title, children } = this.props;
    this.setState({ ...this.props, title: title || children });
    super.render();
  }
}
