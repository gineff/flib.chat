import Component from "utils/component";
import { Group, Control } from "components/form";
import ListUser from "./listUser";
import { addUsers } from "services/chatController";
import { searchUser } from "services/userController";

export default class FormAddUser extends Component {
  constructor(props?: P) {
    super({
      ...props,
      ListUser,
      Group,
      Control,
    });
  }
  getStateFromProps(): void {
    const { chat } = this.props;
    const onSearch = async () => {
      const login = (this.element.querySelector("[name='name']") as HTMLInputElement).value;
      const users = await searchUser(login);
      this.setState({ users });
    };
    const onAddUser = (event: { target: HTMLButtonElement }) => {
      const { target } = event;
      const userId = target.dataset["userid"];
      if (userId) addUsers(chat.id, [+userId]);
    };
    this.setState({ users: [], onSearch, onAddUser });
  }
  render(): string {
    return /*html*/ `
    <div>
      <Group className="form__user-action form__user-search">
        <Control name="name" />
        <Button variant="icon" title="&#128269;" onClick={{onSearch}} />
      </Group>
      <ListUser mode="add" users={{users}} onClick={{onAddUser}} />
    </div>  
    `;
  }
}
