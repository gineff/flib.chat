import Component from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Button from "../../components/button";
import Sidebar, { Header, Body } from "components/sidebar";
import Main from "components/main";
import { SearchForm, List, Messages, Header as ChatHeader, Footer } from "components/chat";
import { ProfileLink } from "components/user";
import { Link } from "utils/router";
import template from "./index.tem";
import "./index.css";
import { useStoreContext } from "utils/store";
import { initController, createChat } from "services/chatController";
import Modal from "components/modal";
import { Control } from "components/form";

export default class ChatPage extends Component {
  constructor(props?: P) {
    super({
      ...props,
      template,
      className: "chat-view",
      Wrapper,
      Sidebar,
      Main,
      Button,
      Link,
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
  init(): void {
    const { dispatch } = useStoreContext();
    initController(dispatch);
    super.init();
  }
  getStateFromProps(): void {
    const control = new Control({ className: "new-chat-name" });

    const onCreateChat = () => {
      const content = control.getContent() as HTMLInputElement;
      content.value = "";
      const modal = new Modal({
        title: "Название чата",
        body: control,
        submitTitle: "Создать",
        onSubmit: () => {
          const name = content.value;
          createChat(name);
          modal.close();
        },
      });
    };

    const searchChat = () => alert("chat search");
    const { className } = this.props;
    this.state = { className, searchChat, onCreateChat };
  }
}
