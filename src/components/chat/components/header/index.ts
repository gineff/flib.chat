/* eslint-disable no-underscore-dangle */
import Component from "../../../../utils/component";
import { useEventBus } from "../../../../utils";
import Avatar from "../../../avatar";
import Button from "../../../button";
import template from "./index.tem";
import "./index.css";

const [on] = useEventBus;
export default class Header extends Component {
  protected template = template;
  constructor(props: P) {
    super({ ...props, Button, "Chat.Avatar": Avatar});

    on("ChatItemSelected", (chat: any) => {
      this.props = { ...this.props, chat };
      this.render();
    });
  }

  render() {
    const { chat } = this.props;
    this.props = { ...this.props, empty: chat ? "" : "empty" };
    return super.render();
  }
}
