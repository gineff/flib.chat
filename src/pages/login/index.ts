import Component from "../../utils/component";
import { stringifyProps } from "../../utils";
import Wrapper from "../../components/wrapper";
import Form, { Header, Footer, Body, Group, Label, Control, submitForm } from "../../components/form";
import Button from "../../components/button";
import { Link } from "utils/router";
import { useStoreContext, storeProviderType, StoreProvider, storeReducer } from "utils/store";
import { SigninData } from "api/types";
import { signin } from "services/authController";
import validator from "utils/validator";
import connect from "utils/connect";
import template from "./index.tem";
import "./index.css";

function validate(event: { target: HTMLInputElement }) {
  const { target } = event;
  validator(target);
}

class Login extends Component {
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
    /*
    const setAuthError = () => {
      this.setState({ formError: store.getState().formError });
    };

    const { store } = useStoreContext();
    if (store === undefined) return;
    store.on("changed", setAuthError);
    this.eventBus().on(Component.EVENTS.FLOW_CWU, () => store.off("changed", setAuthError));*/
  }

  getStateFromProps() {
    function onLogin(event: { target: HTMLButtonElement }) {
      const data: boolean | Formdata = submitForm(event);

      if (typeof data === "object") {
        const loginRequestData = (data as Formdata).reduce((prev, next) => Object.assign(prev, next), {});
        signin(loginRequestData as SigninData);
      }
    }

    const inputs = [
      {
        name: "login",
        type: "text",
        placeholder: "ivanivanov",
        label: "Логин",
        value: "Anri",
      },
      {
        name: "password",
        type: "password",
        placeholder: "••••••••••••",
        label: "Пароль",
        value: "AnriChess1980",
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
    this.state = { validate, onLogin, inputsView, buttons, formError: null };
  }
}

export default connect(Login, (store) => ({ formError: store.getState().formError }));
//Todo [credentials, setCredentials] = useState({login:"", password:""})
