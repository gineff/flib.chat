import Component from "../../../../utils/component";
import "./index.css";

export default class Body extends Component {
  constructor(props) {
    super({...props, template: "<div class='sidebar__body'>{{children}}</div>"})
  }
}
