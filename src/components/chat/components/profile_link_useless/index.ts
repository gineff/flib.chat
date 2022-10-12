import Component from "../../../../utils/component";
import Button from "../../../button"
import { goToElementHref, stringifyProps } from "utils";
import template from "./index.tem";
import "./index.css";

export default class ProfileLink extends Component {
  
  constructor(props: P) {
    super({...props, template, Button})
  }

  render() {

    const buttonProps =  {
      variant: "link",
      href: "/profile",
      className: "user_profile-link-button",
      title: "Авторизоваться",
      clickHandler: goToElementHref,
    }

    const button = new Button(buttonProps)

    this.setState({button})

    super.render();
  }

}
