/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import template from "./index.tem";
import {goToElementHref}  from "../../utils";
import  Component from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Button from "../../components/button";
import "./index.css";

const test = ()=> {console.log(this.element)}

export default class Er404 extends Component {
  constructor(props) {
    super({ ...props, Wrapper, Button, goToElementHref, test, template });
  }
}
