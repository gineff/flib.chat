import Component from "../../../../utils/component";
import { Control } from "../../../form";
import template from "./index.tem";
import "./index.css";

export default class SearchForm extends Component {
  constructor(props) {
    super({ ...props, template, "Form.Control": Control });
  }
}
