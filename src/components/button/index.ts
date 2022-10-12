import Component from "../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class Button extends Component {
  protected template = template;
  constructor(props: P) {
    super({...props, template});
    this.setState({...props, title: this.props.title? this.props.title: this.props.children })
  }

  /*render() {
    const { title, children } = this.props;
    this.props.title = title || children;
    return super.render();
  }*/
}
