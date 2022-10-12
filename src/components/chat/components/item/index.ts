import Component from "../../../../utils/component";
import Avatar from "../../../avatar";
import UnreadCount from "./components/unread-count";
import MessageTime from "../../../date";
import template from "./index.tem";
import "./index.css";
import { useEventBus } from "utils";

const [on, emit] = useEventBus;
export default class Item extends Component {
  constructor(props: P) {
    super({ ...props, template, "Chat.Avatar": Avatar, UnreadCount, MessageTime });
  }
  render(): void {
    const { chat, className } = this.props;

    const clickHandler = () => {
      emit("ChatItemSelected", chat);
    };

    this.setState({ chat, className, onClick: clickHandler });
    super.render();
  }
}
