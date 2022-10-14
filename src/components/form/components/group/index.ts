import Component from "../../../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class Group extends Component {
  constructor(props: P) {
    super({ ...props, template });
  }
}
