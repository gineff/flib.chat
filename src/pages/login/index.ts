import Component from "../../utils/component";
import { goToElementHref, stringifyProps } from "../../utils";
import Wrapper from "../../components/wrapper";
import Form, { Header, Footer, Body, Group, Label, Control } from "../../components/form";
import Button from "../../components/button";
import validator from "utils/validator";
import template from "./index.tem";
import "./index.css";

function submit(event: {target: HTMLButtonElement}) {
  const { target } = event;
  const form: HTMLElement = target!.closest(".form")!;
  //@ts-ignore
  const controls : HTMLInputElement[] = form.querySelectorAll(".form__control");
  let result : boolean = false;
  controls.forEach((el) => {
    result = validator(el) || false;
  });
  if (result) goToElementHref(event);
}

function validate(event: {target: HTMLInputElement}) {
  const {target} = event;
  validator(target);
}

export default class Login extends Component {
  template = template;
  constructor(props: P) {
    super({
      ...props,
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

    const inputs = [
      {
        name: "login",
        type: "text",
        placeholder: "ivanivanov",
        label: "Логин",
      },
      {
        name: "password",
        type: "password",
        placeholder: "••••••••••••",
        label: "Пароль",
      },
    ];

    this.props.inputsView = inputs
      .map(
        ({ label, ...rest }) => `
      <Form.Group>
        <Form.Label>${label}</Form.Label>
        <Form.Control ${stringifyProps({...rest, required: true})} />
      </Form.Group>
    `
      )
      .join("\n");

    const ninjaData = [
      {
        variant: "primary",
        href: "/chat",
        className: "login-form__apply-button",
        title: "Авторизоваться",
        onClick: submit,
      },
      {
        variant: "link",
        href: "/register",
        className: "login-form__alternative-button",
        title: "Нет аккаунта?",
        onClick: goToElementHref,
      },
    ];

    this.props.buttons = ninjaData.map((data) => new Button(data));
  }
}
