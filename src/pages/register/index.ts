import Component from "../../utils/component";
import { stringifyProps } from "../../utils";
import Wrapper from "../../components/wrapper";
import Form, { Header, Footer, Body, Group, Label, Control, submitForm } from "../../components/form";
import Button from "../../components/button";
import { Link } from "utils/router";
import validator from "utils/validator";
import template from "./index.tem";
import connect from "utils/connect";
import { SignupData } from "api/types";
import { signup } from "services/authController";

function validate(event: { target: HTMLInputElement }) {
  const { target } = event;
  validator(target);
}

class Register extends Component {
  constructor(props?: P) {
    super({
      ...props,
      template,
      Wrapper,
      Button,
      Form,
      "Form.Header": Header,
      "Form.Body": Body,
      "Form.Footer": Footer,
      "Form.Group": Group,
      "Form.Label": Label,
      "Form.Control": Control,
      Link,
    });
  }

  getStateFromProps(): void {
    function onRegister(event: { target: HTMLButtonElement }) {
      const data: boolean | Formdata = submitForm(event);

      if (typeof data === "object") {
        const registerData = (data as Formdata).reduce((prev, next) => Object.assign(prev, next), {});
        signup(registerData as SignupData);
      }
    }

    const inputs = [
      {
        name: "email",
        type: "email",
        placeholder: "pochta@yandex.ru",
        label: "Почта",
      },
      { name: "login", type: "text", placeholder: "ivanivanov", label: "Логин" },
      { name: "first_name", type: "text", placeholder: "Иван", label: "Имя" },
      {
        name: "second_name",
        type: "text",
        placeholder: "Иванов",
        label: "Фамилия",
      },
      {
        name: "phone",
        type: "tel",
        placeholder: "+7 (***) *** ** **",
        label: "Телефон",
      },
      {
        name: "password",
        type: "password",
        placeholder: "••••••••••••",
        label: "Пароль",
      },
      {
        name: "password2",
        type: "password",
        placeholder: "••••••••••••",
        label: "Пароль (еще раз)",
      },
    ];

    const inputsView = inputs
      .map(
        ({ label, ...rest }) => `
          <Form.Group>
            <Form.Label>${label}</Form.Label>
            <Form.Control ${stringifyProps({ ...rest, required: true })} />
          </Form.Group>
        `
      )
      .join("\n");

    const ninjaData = [
      {
        variant: "primary",
        href: "/chat",
        className: "login-form__apply-button",
        title: "Зарегистрироваться",
        onClick: onRegister,
      },
      {
        variant: "link",
        href: "/login",
        className: "login-form__alternative-button",
        children: "<Link to='/login'><span>Войти</span></Link>",
      },
    ];

    const buttons = ninjaData.map((data) => new Button(data));

    this.setState({ validate, onRegister, inputsView, buttons, formError: null });
  }
}

export default connect(Register, (store) => ({ formError: store.getState().formError }));
