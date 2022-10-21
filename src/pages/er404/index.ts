import template from "./index.tem";
import Component from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Button from "../../components/button";
import { Link } from "utils/router";
import "./index.css";

export default class Er404 extends Component {
  constructor(props?: P) {
    super({ ...props, template, Wrapper, Button, Link });
  }
}
