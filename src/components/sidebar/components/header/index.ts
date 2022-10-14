import Component from "../../../../utils/component";
import "./index.css";

const template = "<div class='sidebar__header'>{{children}}</div>";
export default class Header extends Component {
  constructor(props: P) {
    super({...props, template})
  }
}
