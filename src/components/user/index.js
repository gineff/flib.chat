import Component from "../../utils/component";
import ProfileLink from "./components/profile_link";
import "./index.css";

export { ProfileLink };

export default class User extends Component {
  constructor(props) {
    super({ ...props, template: "<div class='user'>{{children}}</div>" });
  }
}
