/* eslint-disable no-underscore-dangle */
import Component from "../../../../utils/component";
import { useEventBus } from "../../../../utils";
import Button from "../../../button";
import { Control } from "../../../form";
import template from "./index.tem";
import "./index.css";

const [, emit] = useEventBus;

function addClickHandler(e) {
  // console.log(e, this.state.newMessage);
  emit("newMessageAdded", this.state.newMessage);
  this.state = { ...this.state, newMessage: "" };
  this.render();
}

function newMessageChangeHandler(e) {
  this.state = { ...this.state, newMessage: e.target.value };
}

export default class Footer extends Component {
  constructor(props) {
    super({ ...props, Button, Control, template, addClickHandler, newMessageChangeHandler });
  }

  render() {
    return super.render();
  }
}
