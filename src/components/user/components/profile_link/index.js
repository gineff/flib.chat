import Component from "../../../../utils/component";
import Button from "../../../button";
import template from "./index.tem";
import "./index.css";

export default class ProfileLink extends Component {
  constructor(props) {
    super({ ...props, template, Button });

    this.state.button = new Button({
      variant: "link",
      href: "/profile.html",
      className: "user_profile-link-button",
      title: "Профиль   >",
    });
  }
}
