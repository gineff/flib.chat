import Component from "utils/component";
import Button from "components/button";
import { stringifyProps, transformPassword } from "utils";
import { logout } from "services/authController";
import { updateProfile, updatePassword } from "services/userController";
import { submitForm } from "components/form";
import { PasswordData, ProfileDataT } from "api/types";

type ButtonsOption = {
  variant: string;
  className: string;
  title: string;
};

type State = {
  mode: string;
  buttonsData: ButtonsOption[];
};

export default class extends Component {
  constructor(props: P) {
    super({ ...props, Button });
  }
  getStateFromProps(): void {
    const { mode, setMode } = this.props;

    const buttonsData = [
      {
        variant: "link",
        className: "user-profile__change-data-button",
        title: "Изменить данные",
        onClick: setMode.bind(null, "editProfile"),
      },
      {
        variant: "link",
        className: "login-form__change-password-button",
        title: "Изменить пароль",
        onClick: setMode.bind(null, "editPassword"),
      },
      {
        variant: "link",
        className: "login-form__logout-button",
        title: "Выйти",
        onClick: logout,
      },
    ];

    const onSaveData = (event: { target: HTMLButtonElement }) => {
      const data: boolean | Formdata = submitForm(event);

      if (typeof data === "object") {
        const profileOrPasswordData = (data as Formdata).reduce((prev, next) => Object.assign(prev, next), {});
        if (mode === "editProfile") {
          updateProfile(profileOrPasswordData as ProfileDataT);
        } else {
          updatePassword(transformPassword(profileOrPasswordData as PasswordData));
        }
      }
    };

    this.state = { mode, buttonsData, onSaveData };
  }
  render(): string {
    const { buttonsData, mode } = this.state as State;
    if (mode !== "read") {
      return `<Button variant="primary" title="Сохранить" className="user-profile__save-data-button" 
      onClick={{onSaveData}}/>`;
    }
    return (
      "<div>" +
      buttonsData
        .map(
          (data) => /*html */ `
        <Button ${stringifyProps(data)} />`
        )
        .join("\n") +
      "</div>"
    );
  }
}
