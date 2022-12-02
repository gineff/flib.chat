import Component from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Avatar from "../../components/avatar";
import Form, { Header, Footer, Body, Group, Label, Control } from "../../components/form";
import Button from "../../components/button";
import template from "./index.tem";
import "./index.css";
import { go } from "utils/router";
import connect from "utils/connect";
import { UserT } from "api/types";
import ButtonsView from "./components/buttonsView";
import InputsView from "./components/inputsView";
import Modal from "components/modal";
import File from "components/file";
import { updateAvatar } from "services/userController";
import { useStoreContext } from "utils/store";
import { initController as initAuthController } from "services/authController";
import { initController as initUserController } from "services/userController";
import validator from "utils/validator";

type State = {
  mode: "read" | "editProfile" | "editPassword";
  user: UserT;
  formError: string | null;
};

const goBack = () => {
  go(-1);
};

function validate(event: { target: HTMLInputElement }) {
  const { target } = event;
  validator(target);
}

class Profile extends Component {
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
      validate,
      ButtonsView,
      InputsView,
    });
    const { dispatch } = useStoreContext();
    initAuthController(dispatch);
    initUserController(dispatch);
  }

  getStateFromProps() {
    const setMode = (mode: string) => {
      this.setState({ mode });
    };

    const onGoBack = () => {
      const { mode } = this.state as State;
      if (mode === "read") {
        goBack();
      } else {
        this.setState({ mode: "read" });
      }
    };

    const onAvatarUpdate = () => {
      const fileForm = new File({ accept: "image/*" });

      const modal = new Modal({
        title: "Загрузите файл",
        body: fileForm,
        buttons: "this is buttons",
        submitTitle: "Поменять",
        onSubmit: () => {
          const formData = new FormData();
          const files = fileForm.files as FileList;
          formData.append("avatar", files[0] as Blob);
          updateAvatar(formData);
          modal.close();
        },
      });
    };

    const { store } = useStoreContext();

    this.state = {
      user: store.getValue("user"),
      mode: "read",
      formError: null,
      validate,
      setMode,
      onGoBack,
      onAvatarUpdate,
    };
  }
}

export default connect(Profile, (store) => {
  const { user, formError } = store.getState();
  return { user, formError, mode: "read" };
});
