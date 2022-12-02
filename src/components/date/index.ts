import Component from "../../utils/component";
import template from "./index.tem";
import "./index.css";
import { formattedTime, formatedDate } from "./helper";

export default class DateComponent extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }
  getStateFromProps(): void {
    const { time, format } = this.props;
    const forTime = time.trim() ? formattedTime(time, format) : null;
    this.setState({ ...this.props, formattedTime: forTime });
  }
}

export { formattedTime, formatedDate };
