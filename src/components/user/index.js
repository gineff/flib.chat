import Component from "../../utils/component";
import ProfileLink from "./components/profile_link";
import "./index.css";

export { ProfileLink };

export default class User extends Component {
  template= "<div class='user'>{{children}}</div>"
}
