import Component from "../../../../utils/component";
import Avatar from "../../../avatar";
import UnreadCount from "./components/unread-count";
import MessageTime from "../../../date";
import template from "./index.tem";
import "./index.css";

export default class Item extends Component {
  template = template;
  constructor(props: P) {
    super({ ...props, "Chat.Avatar": Avatar, UnreadCount, MessageTime });
  }
}
