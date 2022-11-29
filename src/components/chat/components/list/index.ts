import Component from "../../../../utils/component";
import { setContext } from "../../../../utils";
import Item from "../item";
import connect from "utils/connect";
import { getChats } from "services/chatController";
import { ChatT } from "api/types";

class List extends Component {
  constructor(props: P) {
    super({ ...props, "Chat.Item": Item });
  }
  init(): void {
    getChats();
    super.init();
  }
  getStateFromProps(): void {
    this.setState({ chats: null, activeChat: null });
  }
  render(): string {
    const { chats, activeChat } = this.state as Partial<AppState>;
    const activeChatId = activeChat && activeChat.id;
    const list =
      chats &&
      chats.map((chat: ChatT) => {
        const className = activeChatId === chat.id ? "chat__item chat__item_active" : "chat__item";
        return new Item({ chat, className });
      });

    return /*html*/ `
      <div class="chat__list">
        ${list ? `context:${setContext(list)}` : ""}
      </div>
    `;
  }
}

export default connect(List, (store) => ({
  chats: store.getState().chats,
  activeChat: store.getState().activeChat,
}));
