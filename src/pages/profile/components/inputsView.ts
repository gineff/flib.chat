import Component from "utils/component";
import { Group, Label, Control } from "components/form";
import { stringifyProps } from "utils";

type InputsOption = {
  name: string;
  type: string;
  value: string;
  label: string;
};

type State = {
  mode: string;
  profileData: InputsOption[];
  passwordData: InputsOption[];
};

const pleceHolderUser = {
  email: "mail@pochta.ru",
  login: "IvanIvanov",
  secondName: "Ivanov",
  firstName: "Ivan",
  phone: "+7 (909) 967 30 30",
  avatar: null,
};

export default class extends Component {
  constructor(props: P) {
    super({ ...props, Group, Label, Control });
  }
  getStateFromProps() {
    // eslint-disable-next-line prefer-const
    let { user, mode } = this.props;
    user = user || pleceHolderUser;

    const profileData = [
      {
        name: "email",
        type: "email",
        value: user.email,
        label: "email",
      },
      {
        name: "login",
        type: "text",
        value: user.login,
        label: "Логин",
      },
      {
        name: "firstName",
        type: "text",
        value: user.firstName,
        label: "Имя",
      },
      {
        name: "secondName",
        type: "text",
        value: user.secondName,
        label: "Фамилия",
      },
      {
        name: "displayName",
        type: "text",
        value: user.displayName,
        label: "Имя в чате",
      },

      {
        name: "phone",
        type: "tel",
        value: user.phone,
        label: "Телефон",
      },
    ];
    const passwordData = [
      {
        name: "oldPassword",
        type: "password",
        value: "",
        label: "Старый пароль",
      },
      {
        name: "password",
        type: "password",
        value: "",
        label: "Новый пароль",
      },
      {
        name: "password2",
        type: "password",
        value: "",
        label: "Повторите новый пароль",
      },
    ];
    this.setState({ profileData, passwordData, mode });
  }

  render(): string {
    const { profileData, passwordData, mode } = this.state as State;
    const disabled = mode !== "read" ? "" : "disabled";

    const nullMiddleware = (str: string) => str.replace("null", "");
    const data = mode !== "editPassword" ? profileData : passwordData;
    return (
      "<div>" +
      data
        .map(
          ({ label, ...rest }) => `
        <Form.Group>
          <Form.Label>${label}</Form.Label>
          <Form.Control ${nullMiddleware(stringifyProps({ ...rest, required: true, [disabled]: true }))}/>
        </Form.Group>`
        )
        .join("\n") +
      "</div>"
    );
  }
}
