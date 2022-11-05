import Component from "../../utils/component";
import { stringifyProps } from "../../utils";
import Wrapper from "../../components/wrapper";
import Avatar from "../../components/avatar";
import Form, { Header, Footer, Body, Group, Label, Control } from "../../components/form";
import Button from "../../components/button";
import template from "./index.tem";
import "./index.css";
import { useContext } from "../../utils/context";
import User from "../../utils/user";
import { go } from "utils/router";
import validator from "utils/validator";

const currentUser = useContext(User);

let editMode = false;

const goBack = () => {
  go(-1);
};

export default class Profile extends Component {
  constructor(props?: P) {
    super({
      ...props,
      template,
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
      goBack,
    });
  }

  getStateFromProps(): void {

    function validate(event: { target: HTMLInputElement }) {
      const { target } = event;
      validator(target);
    }

    const changeClickHandler = () => {
      if (editMode) {
        const controls = this.element.querySelectorAll(".form__control") as unknown as HTMLInputElement[];
        let result = true;
        const data: { [x: string]: string }[] = [];
        controls.forEach((el) => {
          const { name, value } = el;
          data.push({ [name]: value });

          if (!validator(el)) {
            result = false;
          }
        });

        if (!result) return;
        console.log("FORM DATA: ", data);
      }

      editMode = !editMode;
      this.render();
    };

    const disabled = editMode ? "" : "disabled";
    const inputs = [
      {
        name: "email",
        type: "email",
        value: "pochta@mail.ru",
        label: "email",
      },
      {
        name: "login",
        type: "text",
        value: "ivanivanov",
        label: "Логин",
      },
      {
        name: "second_name",
        type: "text",
        value: "ivanivanov",
        label: "Фамилия",
      },
      {
        name: "first_name",
        type: "text",
        value: "Andrey",
        label: "Имя в чате",
      },

      {
        name: "phone",
        type: "tel",
        value: "+7 (909) 967 30 30",
        label: "Телефон",
      },
    ];

    const inputsView = inputs
      .map(
        ({ label, ...rest }) => `
      <Form.Group>
        <Form.Label>${label}</Form.Label>
        <Form.Control ${stringifyProps({ ...rest, [disabled]: true })}/>
      </Form.Group>`
      )
      .join("\n");

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

    this.state = { ...this.props, changeClickHandler, validate, buttons, inputsView, currentUser };
  }
}
