/* eslint-disable camelcase */
import Component from "../../../../utils/component";
import fetchData from "../../../../utils/fetchData";
import { useEventBus } from "../../../../utils";
import { useContext } from "../../../../utils/context";
import User from "../../../../utils/user";
import template from "./index.tem";
import Message from "../message";
import "./index.css";

type user = { user_id: number; name: string; surname: string };

const sortByDate = (messages: message[]) =>
  messages.sort((cur, prev) => new Date(cur.date).getTime() - new Date(prev.date).getTime());

const markFirstMessageOfTheDayNThisUser = (messages: message[], currentUserProp: user) =>
  messages?.map((item, index, array) => {
    const { date, user_id } = item;
    const firstOfTheDay = new Date(date).getDate() !== new Date(array[index - 1]?.date).getDate();
    const currentUser = user_id === currentUserProp.user_id;
    return { ...item, firstOfTheDay, currentUser };
  });

const [on] = useEventBus;
const currentUser: user = useContext(User);
export default class Messages extends Component {
  constructor(props: P) {
    super({ ...props, template, Message });

    on("ChatItemSelected", async (chat: chat) => {
      const { id } = chat;
      const data = await fetchData(`/chats/${id}`);
      const messages = markFirstMessageOfTheDayNThisUser(sortByDate(data), currentUser) || [];
      this.setProps({ ...this.props, chat, messages, preloaderIsHidden: "hidden", currentUser });
    });

    on("newMessageAdded", async (messageStr: string) => {
      const {
        messages,
        chat: { chat_id },
      } = this.props;

      const message = {
        user_id: currentUser.user_id,
        chat_id,
        currentUser: true,
        content: messageStr.trim(),
        date: new Date().toISOString(),
      };
      messages.push(message);
      console.log(message);

      this.setProps({ ...this.props, messages });
    });
  }

  componentDidUpdate() {
    return true;
  }

  render() {
    const { messages } = this.props;

    const list = messages ? messages.map((mes: message) => new Message(mes)) : "";
    this.state = { ...this.props, list };

    super.render();
  }
}
