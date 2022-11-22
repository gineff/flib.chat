import Component from "utils/component";
import "./index.css";

type State = {
  title?: string;
  accept?: string;
  onUpload: () => void;
  onSubmit: () => void;
};

export default class File extends Component {
  public files: FileList | undefined;
  componentDidMount(): void {
    this.refs.input = this.element.querySelector("#file_input") as HTMLInputElement;
    this.refs.label = this.element.querySelector(".file-upload__title") as HTMLLabelElement;
    const onChange = this.onChange.bind(this);
    this.refs.input.addEventListener("change", onChange);
    this.eventBus().on(Component.EVENTS.FLOW_CWU, () => {
      this.refs.input.removeEventListener("change", onChange);
    });
  }
  onChange() {
    const input = this.refs.input as HTMLInputElement;
    const files = input.files as FileList;

    if (files.length > 0) {
      this.files = files;
      this.refs.label.innerHTML = files[0].name;
    }
  }

  render(): string {
    const { title, accept } = this.state as State;
    return /*html*/ `
      <div class="file-upload">
        <label for="file_input" class="file-upload__title">${title ? title : "Выбрать файл на <br> компьютере"}</label>
        <input class="file-upload__file" id="file_input" type="file" accept="${accept ? accept : "*"}">
      </div>  
    `;
  }
}
