import Component from "../../utils/component";
import template from "./index.tem";
import "./index.css";

type State = {
  image: string;
};

export default class Avatar extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }
  render(): string {
    const { image } = this.state as State;
    return /*html*/ `
      <div class="avatar {{className}}" style="background-image: url(${image});"></div>
      `;
  }
}
