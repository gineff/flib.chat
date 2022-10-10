import Component from "../../../../utils/component";
import { useEventBus, uid } from "../../../../utils";
import Item from "../item";
import template from "./index.tem";
import "./index.css";

const [on] = useEventBus;
export default class List extends Component {
  template = template;
  constructor(props) {
    super({ ...props, "Chat.Item": Item });

    on("ChatItemSelected", (chat) => {
      const { id } = chat;
      this.state = { ...this.state, activeChatId: id };
      this.render();
    });
  }

  render() {
    const { chats, activeChatId } = this.state;

    const list = chats
      ? chats.map((chat) => new Item({ chat, className: `chat__item ${chat.id == activeChatId ? "active" : ""}` }))
      : "";

    this.state = { ...this.state, list, id: uid() };

    return super.render();
  }
}
