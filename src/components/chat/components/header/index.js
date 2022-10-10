/* eslint-disable no-underscore-dangle */
import Component from "../../../../utils/component";
import { useEventBus } from "../../../../utils";
import Avatar from "../../../avatar";
import Button from "../../../button";
import template from "./index.tem";
import "./index.css";

const [on] = useEventBus;
export default class Header extends Component {
  template = template;
  constructor(props) {
    super({ ...props, Button, "Chat.Avatar": Avatar});

    on("ChatItemSelected", (chat) => {
      this.state = { ...this.state, chat };
      this.render();
    });
  }

  render() {
    const { chat } = this.state;

    this.state = { ...this.state, empty: chat ? "" : "empty" };

    return super.render();
  }
}
