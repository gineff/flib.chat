import Component from "../../../../utils/component";
import { useEventBus, uid } from "../../../../utils";
import Item from "../item";
import template from "./index.tem";
import "./index.css";

const [on] = useEventBus;
export default class List extends Component {
  template = template;
  constructor(props: P) {
    super({ ...props, "Chat.Item": Item });

    on("ChatItemSelected", (chat: any) => {
      const { id } = chat;
      this.props = { ...this.props, activeChatId: id };
      this.render();
    });
  }

  render() {
    const { chats, activeChatId } = this.props;

    const list = chats
      ? chats.map((chat: any) => new Item({ chat, className: `chat__item ${chat.id == activeChatId ? "active" : ""}` }))
      : "";

    this.props = { ...this.props, list, id: uid() };

    return super.render();
  }
}
