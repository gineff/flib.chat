import Component from "../../utils/component";
import { goToElementHref, useEventBus } from "../../utils";
import Wrapper from "../../components/wrapper";
import Button from "../../components/button";
import Sidebar, { Header, Body } from "components/sidebar";
import Main from "components/main";
import { SearchForm, List, Messages, Header as ChatHeader, Footer } from "components/chat";
import { ProfileLink } from "components/user";
import chats from "static/json/chats.json";
import template from "./index.tem";
import "./index.css";

const [, emit] = useEventBus;

type chat = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: number,
    time: string,
    content: string
  }
}

export default class ChatPage extends Component {
  constructor(props: P) {
    super({
      ...props,
      template,
      className: "chat-view",
      goToElementHref,
      searchChat: () => alert("chat search"),
      chats,
      Wrapper,
      Sidebar,
      Main,
      Button,
      "Sidebar.Header": Header,
      "Sidebar.Body": Body,
      "User.ProfileLink": ProfileLink,
      "Chat.SearchForm": SearchForm,
      "Chat.List": List,
      "Chat.Header": ChatHeader,
      "Chat.Messages": Messages,
      "Chat.Footer": Footer,
    });
  }

  render() {
    /*const ChatItemSelected = (event: {target:HTMLElement}) => {
      const { target } = event;
      const chatItemSelected = target.closest(".chat-item")!;
      const id = +chatItemSelected.getAttribute("chat-id")!;
      const chat = chats.find((el: chat) => el.id === id);
      emit("ChatItemSelected", chat);
    };*/
    const {className} = this.props;
    this.state= {className, chats };
    super.render();
  }
}
 