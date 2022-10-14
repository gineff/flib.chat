import Component from "../../utils/component";
import { goToElementHref } from "../../utils";
import Wrapper from "../../components/wrapper";
import Button from "../../components/button";
import Sidebar, { Header, Body } from "components/sidebar";
import Main from "components/main";
import { SearchForm, List, Messages, Header as ChatHeader, Footer } from "components/chat";
import { ProfileLink } from "components/user";
import chats from "static/json/chats.json";
import template from "./index.tem";
import "./index.css";


export default class ChatPage extends Component {
  constructor(props?: P) {
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
    const { className } = this.props;
    this.state = { goToElementHref, className, chats };
    super.render();
  }
}
