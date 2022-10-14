import Component from "../../../../utils/component";
import { useEventBus, uid } from "../../../../utils";
import Item from "../item";
import template from "./index.tem";



const [on] = useEventBus;
export default class List extends Component {
  constructor(props: P) {
    super({ ...props, template, "Chat.Item": Item });
  }

  render() {
    on("ChatItemSelected", (chat: chat) => {
      const items = this.element.querySelectorAll(".chat-item");
      items.forEach((item) =>
        item.setAttribute("data-active", String(Number(item.getAttribute("chat-id")) === chat.id))
      );
    });

    const { chats = [] } = this.props;
    const list = chats.map((chat: chat) => new Item({ chat, className: "chat__item" }));
    this.state = { list, id: uid() };

    super.render();
  }
}
