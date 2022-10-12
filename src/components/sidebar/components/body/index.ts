import Component from "../../../../utils/component";
import "./index.css";

const template = "<div class='sidebar__body'>{{children}}</div>";
export default class Body extends Component {
  constructor(props: P) {
    super({...props, template})
  }
}
