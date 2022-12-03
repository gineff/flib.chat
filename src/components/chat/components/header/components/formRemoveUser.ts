import Component from "utils/component";
import { Group, Control } from "components/form";
import ListUser from "./listUser";
import { removeUsers, getUsers } from "services/chatController";

export default class FormRemoveUser extends Component {
  constructor(props?: P) {
    super({
      ...props,
      ListUser,
      Group,
      Control,
    });
  }
  async init() {
    super.init();
    const { chat } = this.props;
    const users = await getUsers(chat.id);
    if (users) this.setState({ users });
  }
  getStateFromProps(): void {
    const { chat } = this.props;

    const onRemoveUser = async (event: { target: HTMLButtonElement }) => {
      const { target } = event;
      const userId = target.dataset["userid"];
      if (userId) {
        const result = await removeUsers(chat.id, [+userId]);
        if(result) {
          const group = target.parentNode;
          const parent = group?.parentElement;
          parent?.removeChild(group as Node);
        }
      }
    };
    this.setState({ users: [], onRemoveUser });
  }
  render(): string {
    return /*html*/ `
      <ListUser mode="remove" users={{users}} onClick={{onRemoveUser}}/>
    `;
  }
}
