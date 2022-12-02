import Component from "../../../../utils/component";
import MessageItem from "../message";
import "./index.css";
import connect from "utils/connect";
import { setContext } from "utils";
import { UserT, MessageT } from "api/types";
import { useStoreContext } from "utils/store";
import { getToken } from "services/chatController";
import WS from "utils/ws";
import { useEventBus } from "utils";

const [on] = useEventBus;

const markFirstMessageOfTheDayNThisUser = (messages: MessageT[], currentUserProp: UserT) =>
  messages?.map((item, index, array) => {
    const { time, userId } = item;
    const firstOfTheDay = new Date(time).getDate() !== new Date(array[index - 1]?.time).getDate();
    const currentUser = userId === currentUserProp.id;
    return { ...item, firstOfTheDay, currentUser };
  });

class MessageList extends Component {
  protected socket: any;
  getStateFromProps(): void {
    this.setState({ user: null, activeChat: null, messages: null });
  }
  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.activeChat !== newProps.activeChat) {
      this.initSocket(newProps.activeChat.id);
      return true;
    } else {
      return !this.isEqual(oldProps, newProps);
    }
  }
  init(): void {
    const { dispatch } = useStoreContext();
    this.socket = new WS(dispatch);
    on("newMessageAdded", (message: string | number) => {
      this.socket.sendMessage(message);
    });
    super.init();
  }
  async initSocket(chatId: number) {
    const token = await getToken(chatId);
    const { store, dispatch } = useStoreContext();
    const { user, activeChat } = store.getState();

    this.socket.init({ token, user, activeChat }, dispatch);
  }

  render(): string {
    const { activeChat, user, messages } = this.state as Partial<AppState>;
    let markedMessages;
    if (messages && user) {
      markedMessages = markFirstMessageOfTheDayNThisUser(messages, user);
    }

    return /*html*/ `
      <div class="chat__messages">
        <div class="chat__messages-preloader ${activeChat ? "hidden" : ""}">
          Выберите чат чтобы отправить сообщение 
        </div>
        <div class="chat__messages-list messages">
          ${markedMessages ? `context:${setContext(markedMessages.map((mes: MessageT) => new MessageItem(mes)))}` : ""}
        </div>
      </div>
    `;
  }
}

export default connect(MessageList, (store) => ({
  messages: store.getState().messages,
  user: store.getState().user,
  activeChat: store.getState().activeChat,
}));
