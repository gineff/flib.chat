import Component from "../../utils/component";
import Provider from "../../utils/user";

import template from "./index.tem";
import "./index.css";

export default class Wrapper extends Component {
  protected template = template;
  constructor(props: P) {
    super({ ...props, Provider });
  }
}
