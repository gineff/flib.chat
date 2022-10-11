import Component from "../../../../utils/component";
import Button from "../../../button"
import { goToElementHref, stringifyProps } from "utils";
import template from "./index.tem";
import "./index.css";

export default class ProfileLink extends Component {
  template = template;
  constructor(props: P) {
    super({...props, Button})

    const buttonProps =  {
      variant: "link",
      href: "/profile",
      className: "user_profile-link-button",
      title: "Авторизоваться",
      clickHandler: goToElementHref,
    }

    this.props.button = new Button(buttonProps)

  }
  render() {
    console.log(this);
    return super.render();
  }

}
