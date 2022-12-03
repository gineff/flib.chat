import Component from "../../../../utils/component";
import Avatar from "../../../avatar";
import Button from "../../../button";
import { removeChat } from "services/chatController";
import Modal from "components/modal";
import { ChatT } from "api/types";
import template from "./index.tem";
import "./index.css";
import FormRemoveUser from "./components/formRemoveUser";
import FormAddUser from "./components/formAddUser";
import connect from "utils/connect";


class Header extends Component {
  constructor(props: P) {
    super({ ...props, template, Button, "Chat.Avatar": Avatar });
  }

  getStateFromProps(): void {
    const onAddUser = () => {
      const { chat } = this.state as { chat: ChatT };
      const form = new FormAddUser({ chat });

      const modal1 = new Modal({
        className: "form__add-user",
        body: form,
        title: "Добавить пользователя",
        cancelTitle: "Отмена",
        onCancel: () => modal1.close(),
      });
    };

    const onGetUserList = () => {
      const { chat } = this.state as { chat: ChatT };
      const form = new FormRemoveUser({ chat });

      const modal = new Modal({
        className: "form__remove-user",
        title: `Список пользователей чата "${chat.title}"`,
        body: form,
        submitTitle: "Добавить пользователя",
        cancelTitle: "Отмена",
        onCancel: () => modal.close(),
        onSubmit: () => {
          onAddUser(), modal.close();
        },
      });
    };

    const onChatRemove = () => {
      const { chat } = this.state as { chat: ChatT };
      const modal = new Modal({
        title: `Удалить чат "${chat.title}"`,
        body: "",
        submitTitle: "Удалить",
        cancelTitle: "Отмена",
        onCancel: () => modal.close(),
        onSubmit: () => {
          removeChat(chat.id);
          modal.close();
        },
      });
    };

    this.state = { chat: null, empty: "data-empty", onChatRemove, onGetUserList };
  }
}

export default connect(Header, (store) => ({
  chat: store.getState().activeChat,
  empty: store.getState().activeChat ? "" : "data-empty",
}));
