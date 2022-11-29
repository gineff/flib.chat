import Component from "utils/component";
import { Group, Control } from "components/form";
import Button from "components/button";
import { UserT } from "api/types";
import { setContext } from "utils/index";

class Item extends Component {
  constructor(props: P) {
    super({ ...props, Button, Group, Control });
  }
  render(): string {
    const { user, mode } = this.state as { user: UserT; mode: string };
    return `
    <Group className="form__user-action">
      <Control disabled="true" value="${user?.login}"/>
      <Button variant="icon" data-userId="${user?.id}" title="${mode === "remove" ? "&#10006;" : "🞥"}" />
    </Group>`;
  }
}

export default class ListUser extends Component {
  constructor(props: P) {
    super({ ...props, Item });
  }
  render(): string {
    const { users, mode } = this.state as { users: UserT[]; mode: string };
    return users.length > 0
      ? `<ol>context:${setContext(users.map((user: UserT) => new Item({ user, mode })))}</ol>`
      : "<div></div>";
  }
}
