import Component from "../../utils/component";
import { stringifyProps } from "../../utils";
import Wrapper from "../../components/wrapper";
import Form, { Header, Footer, Body, Group, Label, Control, submitForm } from "../../components/form";
import Button from "../../components/button";
import { Link } from "utils/router";
import { useStoreContext, storeProviderType } from "utils/store";
import validator from "utils/validator";
import template from "./index.tem";
import "./index.css";

type LoginRequestData = {
  login: string;
  password: string;
};

let context: storeProviderType;

const submit = submitForm;

function validate(event: { target: HTMLInputElement }) {
  const { target } = event;
  validator(target);
}

function login(data: LoginRequestData) {
  return { type: "auth_get_login_data", payload: data };
}

function onLogin(event: { target: HTMLButtonElement }) {
  const data: boolean | LoginRequestData = submitForm(event);
  if (typeof data === "object") {
    const { dispatch } = context;
    dispatch(login(data));
  }
}

export default class Login extends Component {
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
      validate,
      submit,
    });
  }

  componentDidMount() {
    context = useStoreContext();
    const { store } = context;
    store.on("login_get_response", (response) => console.log(response));
  }

  getStateFromProps() {
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
        title: "Авторизоваться",
        onClick: onLogin,
      },
      {
        variant: "link",
        href: "/register",
        className: "login-form__alternative-button",
        children: "<Link to='/register'><p>Нет аккаунта?!</p></Link>",
      },
    ];

    const buttons = ninjaData.map((data) => new Button(data));
    this.state = { validate, inputsView, buttons };
  }
}
