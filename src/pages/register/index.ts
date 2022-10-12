import Component from "../../utils/component";
import { goToElementHref, stringifyProps } from "../../utils";
import Wrapper from "../../components/wrapper";
import Form, { Header, Footer, Body, Group, Label, Control } from "../../components/form";
import Button from "../../components/button";
import validator from "utils/validator";
import template from "./index.tem";

const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const loginRegExp = /^[a-zA-Z0-9.$_]{4,256}$/;
const textRegExp = /^[a-zA-Zа-яА-Я.$_]{4,256}$/;
const phoneRegExp = /^(\+\d|8)[ ()\d-]{10,16}$/;

function submit(event: { target: HTMLButtonElement }) {
  const { target } = event;
  const form: HTMLElement = target!.closest(".form")!;
  //@ts-ignore
  const controls: HTMLInputElement[] = form.querySelectorAll(".form__control");
  let result: boolean = false;
  controls.forEach((el) => {
    result = validator(el) || false;
  });

  if (result) {
    const data: { [key: string]: any } = Array.from(controls).map((el) => ({ [el.name]: el.value }));
    console.log("FORM DATA: ", data);
    const conformation = confirm("Данные формы в консоли, переходим в чат?");

    if (conformation) goToElementHref(event);
  }
}

function validate(event: { target: HTMLInputElement }) {
  const { target } = event;
  validator(target);
}

export default class Register extends Component {
  constructor(props: P) {
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
      goToElementHref,
      validate,
      submit,
    });
  }

  render() {
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
        onClick: submit,
      },
      {
        variant: "link",
        href: "/login",
        className: "login-form__alternative-button",
        title: "Войти",
        onClick: goToElementHref,
      },
    ];

    const buttons = ninjaData.map((data) => new Button(data));

    this.setState({ validate, inputsView, buttons });
    super.render();
  }
}
