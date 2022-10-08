import Component from "../../../../utils/component";
import Button from "../../../button"
import { goToElementHref, stringifyProps } from "../../utils";
import "./index.css";

export default class ProfileLink extends Component {
  constructor(props) {
    super({...props, Button})
  }

  render() {

    const buttonProps =  {
      variant: "link",
      href: "/profile",
      className: "user_profile-link-button",
      title: "Авторизоваться",
      clickHandler: goToElementHref,
    }

    return `
    <div class="chat__profile-link">
      <Button ${stringifyProps(buttonProps)}></Button>
    </div>`;
  }
}
