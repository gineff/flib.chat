import Component from "utils/component";
import { Control } from "../../../form";
import template from "./index.tem";
import "./index.css";

export default class SearchForm extends Component {
  protected template = template;
  constructor(props: P) {
    super({ ...props,  "Form.Control": Control });
  }
}
