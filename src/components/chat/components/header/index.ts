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
  }
  init() {
    on("ChatItemSelected", (chat: unknown) => {
      this.setState({ chat, empty: "" });
    });
    super.init();
  }

  getStateFromProps(): void {
    const { chat } = this.props;
    this.state = { chat };
  }
}
