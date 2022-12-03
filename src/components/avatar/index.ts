import Component from "../../utils/component";
import "./index.css";

type State = {
  image: string;
};

export default class Avatar extends Component {
  render(): string {
    const { image } = this.state as State;
    const url = "https://ya-praktikum.tech/api/v2/resources" + image;
    return /*html*/ `
      <div class="avatar {{className}}" style="background-image: url('${url}');"></div>
      `;
  }
}
