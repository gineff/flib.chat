import template from "./index.tem";
import { goToElementHref } from "../../utils";
import Component from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Button from "../../components/button";
import "./index.css";

export default class Er404 extends Component {
  constructor(props?: P) {
    super({ ...props, template, Wrapper, Button, goToElementHref });
  }
}
