import Component from "../../../../utils/component";
import Button from "../../../button";
import template from "./index.tem";
import "./index.css";

export default class ProfileLink extends Component {
  protected template = template
  constructor(props: P) {
    super({ ...props, Button });

    this.props.button = new Button({
      variant: "link",
      href: "/profile",
      className: "user_profile-link-button",
      title: "Профиль   >",
    });
  }
}
