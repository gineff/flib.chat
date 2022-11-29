import Component from "../../../../utils/component";
import Avatar from "../../../avatar";
import UnreadCount from "./components/unread-count";
import MessageTime from "../../../date";
import Modal from "components/modal";
import File from "components/file";
import template from "./index.tem";
import "./index.css";
import { useEventBus } from "utils";
import { updateAvatar } from "services/chatController";
import { useStoreContext } from "utils/store";

const [, emit] = useEventBus;
export default class Item extends Component {
  constructor(props: P) {
    super({ ...props, template, "Chat.Avatar": Avatar, UnreadCount, MessageTime });
  }

  getStateFromProps(): void {
    const { dispatch} = useStoreContext();
    const { chat, className } = this.props;
    const clickHandler = () => {
      emit("ChatItemSelected", chat);
      dispatch({type:"chat_select_active_chat", payload: {chat}})
    }

    const onAvatarUpdate = () => {
      const fileForm = new File({ accept: "image/*" });

      const modal = new Modal({
        title: "Загрузите файл",
        body: fileForm,
        buttons: "this is buttons",
        submitTitle: "Поменять",
        onSubmit: () => {
          const formData = new FormData();
          const files = fileForm.files as FileList;
          formData.append("avatar", files[0] as Blob);
          formData.append("chatId", chat.id);
          updateAvatar(formData);
          modal.close();
        },
      });
    };

    this.setState({ chat, className, onClick: clickHandler, onAvatarUpdate });
  }
}
