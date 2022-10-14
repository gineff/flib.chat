/* eslint-disable no-underscore-dangle */
import Component from "../../../../utils/component";
import { useEventBus } from "../../../../utils";
import Avatar from "../../../avatar";
import Button from "../../../button";
import template from "./index.tem";
import "./index.css";

const [on] = useEventBus;
export default class Header extends Component {
  constructor(props: P) {
    super({ ...props, template, Button, "Chat.Avatar": Avatar });

    on("ChatItemSelected", (chat: unknown) => {
      console.log("chat", chat);
      this.setProps({ chat, empty: "" });
    });
  }

  render() {
    const { chat } = this.props;
    this.state = { chat };
    super.render();
  }
}
