/* eslint-disable camelcase */
import Component from "../../utils/component";
import template from "./index.tem";
import "./index.css";
import { formattedTime, formatedDate } from "./helper";

export default class DateComponent extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }

  render(): void {
    const { time, format } = this.props;
    this.setState({ ...this.props, formattedTime: formattedTime(time, format) });
    super.render();
  }
}

export { formattedTime, formatedDate };
