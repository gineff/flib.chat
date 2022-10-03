import Component from "../../../../utils/component";
import "./index.css";

export default class Header extends Component {
  constructor(props) {
    super({...props, template: "<div class='sidebar__header'>{{children}}</div>"})
  }
}
