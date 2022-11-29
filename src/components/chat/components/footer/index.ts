/* eslint-disable no-underscore-dangle */
import Component from "../../../../utils/component";
import { useEventBus } from "../../../../utils";
import Button from "../../../button";
import { Control } from "../../../form";
import template from "./index.tem";
import "./index.css";
import Modal from "components/modal";
import File from "components/file";
import { uploadFile } from "services/resourceController";
import { useStoreContext } from "utils/store";

const [, emit] = useEventBus;
let message = "";

export default class Footer extends Component {
  refs: { [key: string]: HTMLInputElement } = {};
  constructor(props: P) {
    super({ ...props, template, Button, Control });
    this.refs.input = this.element.querySelector("input") as HTMLInputElement;
  }
  getStateFromProps(): void {
    const newMessageChangeHandler = (e: { target: { value: string } }) => {
      message = e.target.value;
    };

    const addClickHandler = () => {
      if (message) {
        emit("newMessageAdded", message);
        this.refs.input.value = "";
      }
    };

    const onFileUpload = () => {
      const { store } = useStoreContext();
      const fileForm = new File({ accept: "image/*" });

      if (!store.getState().activeChat) {
        const modal = new Modal({
          title: "Выбирите чат, для загрузки изображения",
          cancelTitle: "Отмена",
          onCancel: () => {
            modal.close();
          },
        });
        return;
      }

      const modal = new Modal({
        title: "Загрузите файл",
        body: fileForm,
        cancelTitle: "Отмена",
        submitTitle: "Загрузить",
        onCancel: () => {
          modal.close();
        },
        onSubmit: async () => {
          const formData = new FormData();
          const files = fileForm.files as FileList;
          formData.append("resource", files[0] as Blob);
          const resource = await uploadFile(formData);
          if (resource?.id) {
            emit("newMessageAdded", resource.id);
          }
          modal.close();
        },
      });
    };

    this.setState({ newMessageChangeHandler, addClickHandler, onFileUpload });
  }
}
