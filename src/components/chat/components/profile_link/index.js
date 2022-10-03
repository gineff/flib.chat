import Component from "../../../../utils/component";
import Button from "../../../button"
import { goToElementHref, stringifyProps } from "../../utils";
import "./index.css";

export default class ProfileLink extends Component {
  constructor(props) {
    super({...props, Button})
  }

  const buttonProps =  {
      variant: "link",
      href: "/profile",
      className: "user_profile-link-button",
      title: "Авторизоваться",
      clickHandler: goToElementHref,
    }


  render() {
    return `
    <div class="chat__profile-link">
      <Button ${stringifyProps(buttonProps)}></Button>
    </div>`;
  }
}
