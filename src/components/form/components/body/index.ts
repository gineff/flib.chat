import Component from "../../../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class Body extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }
}
