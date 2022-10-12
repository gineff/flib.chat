import Component from "../../../../utils/component";
import { useEventBus, uid } from "../../../../utils";
import Item from "../item";
import template from "./index.tem";
import "./index.css";

const [on] = useEventBus;
export default class List extends Component {
  constructor(props: P) {
    super({ ...props, template, "Chat.Item": Item });
  }

  render() {

    on("ChatItemSelected", (chat: any) => {
      const items =  this.element.querySelectorAll('.chat-item');
      [...items].forEach(item=> 
        item.setAttribute("data-active", String(Number(item.getAttribute("chat-id")) === chat.id )))
    })

    const { chats } = this.props;
    //prettier-ignore
    const list = chats? chats.map((chat: any) => new Item({ chat, className: `chat__item` })) : "";
    this.state= { list, id: uid() };



    super.render();
  }
}
