/* eslint-disable camelcase */
import Component from "../../../../utils/component";
import fetchData from "../../../../utils/fetchData";
import { useEventBus } from "../../../../utils";
import { useContext } from "../../../../utils/context";
import User from "../../../../utils/user";
import template from "./index.tem";
import Message from "../message";
import "./index.css";

type user = { user_id: number, name: string, surname: string };

const sortByDate = (messages: any[]) => 
  messages.sort((cur, prev) => new Date(cur.date).getTime() - new Date(prev.date).getTime());

const markFirstMessageOfTheDayNThisUser = (messages: any[], thisUserProp: user) =>
  messages?.map((item, index, array) => {
    const { date, user_id } = item;
    const firstOfTheDay = new Date(date).getDate() !== new Date(array[index - 1]?.date).getDate();
    const thisUser = user_id === thisUserProp.user_id;
    return { ...item, firstOfTheDay, thisUser };
  });

const [on] = useEventBus;
const thisUser: user = useContext(User);
export default class Messages extends Component {
  template = template;
  constructor(props: P) {
    super({ ...props, Message });

    on("ChatItemSelected", async (chat: any) => {
      const { id } = chat;
      const data = await fetchData(`/chats/${id}`, { method: "GET" });
      const messages = markFirstMessageOfTheDayNThisUser(sortByDate(data), thisUser) || [];

      this.props = { ...this.props, chat, messages, preloaderIsHidden: "hidden", thisUser };
      this.render();
    });

    on("newMessageAdded", async (messageStr: any) => {
      const {
        messages,
        chat: { chat_id },
      } = this.props;
      console.log("messageStr", messageStr);
      const message = {
        user_id: thisUser.user_id,
        chat_id,
        thisUser: true,
        content: messageStr.trim(),
        date: new Date().toISOString(),
      };
      messages.push(message);
      this.props = { ...this.props, messages };
      this.render();
    });
  }

  render() {
    const { messages } = this.props;
    const list = messages ? messages.map((mes: any) => new Message(mes)) : "";
    this.props = { ...this.props, list };

    return super.render();
  }
}
