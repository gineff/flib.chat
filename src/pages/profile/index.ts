import Component from "../../utils/component";
import { goToElementHref, stringifyProps } from "../../utils";
import Wrapper from "../../components/wrapper";
import Avatar from "../../components/avatar";

import Form, { Header, Footer, Body, Group, Label, Control } from "../../components/form";
import Button from "../../components/button";
import template from "./index.tem";
import "./index.css";
import { useContext } from "../../utils/context";
import User from "../../utils/user";

const thisUser = useContext(User);

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}

export default class Profile extends Component {
  template = template;
  constructor(props: P) {
    let handleFooterClick;
    super({
      ...props,
      Wrapper,
      Avatar,
      Button,
      Form,
      "Form.Header": Header,
      "Form.Body": Body,
      "Form.Footer": Footer,
      "Form.Group": Group,
      "Form.Label": Label,
      "Form.Control": Control,
      goToElementHref,
      handleFooterClick,
    });
    //ToDO
    handleFooterClick = (event: HTMLElementEvent<HTMLButtonElement>): void => {
      const {target: {classList}} = event;
      console.log(this);
      if (classList.contains("user-profile__change-data-button")) {
        const editMode = true;
        this.render(editMode);
      } else if (classList.contains("user-profile__save-data-button")) {
        this.render(false);
      }
    }
  }

  public render(editMode = false) {
    const disabled = editMode ? "" : "disabled";

    const inputs = [
      {
        name: "email",
        type: "email",
        value: "pochta@mail.ru",
        label: "Логин",
      },
      {
        name: "login",
        type: "text",
        value: "ivanivanov",
        label: "Логин",
      },
      {
        name: "login",
        type: "text",
        value: "ivanivanov",
        label: "Фамилия",
      },
      {
        name: "name",
        type: "text",
        value: "Andrey",
        label: "Имя в чате",
      },

      {
        name: "phone",
        type: "tel",
        value: "+ 7 (909) 967 30 30",
        label: "Телефон",
      },
    ];

    // prettier-ignore
    this.state.inputsView = inputs.map(({ label, ...rest }) => `
      <Form.Group>
        <Form.Label>${label}</Form.Label>
        <Form.Control ${stringifyProps({ ...rest})} ${disabled}/>
      </Form.Group>`).join("\n");

    const ninjaData = [
      {
        variant: "link",
        className: "user-profile__change-data-button",
        title: "Изменить данные",
      },
      {
        variant: "link",
        className: "login-form__change-password-button",
        title: "Изменить пароль",
      },
      {
        variant: "link",
        className: "login-form__logout-button",
        title: "Выйти",
      },
    ];

    const buttons = editMode
      ? new Button({ variant: "primary", title: "Сохранить", className: "user-profile__save-data-button" })
      : ninjaData.map((data) => new Button(data));
    this.state = { ...this.state, buttons, thisUser, editMode };

    // console.log(this.state);
    return super.render();
  }
}
