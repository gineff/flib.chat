/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import template from "./index.tem";
import {goToElementHref}  from "../../utils";
import  Component from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Button from "../../components/button";
import "./index.css";

export default class Er500 extends Component {
  protected template = template;
  constructor(props :P) {
    super({ ...props, Wrapper, Button, goToElementHref});
  }
}
