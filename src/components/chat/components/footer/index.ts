/* eslint-disable no-underscore-dangle */
import Component from "../../../../utils/component";
import { useEventBus } from "../../../../utils";
import Button from "../../../button";
import { Control } from "../../../form";
import template from "./index.tem";
import "./index.css";

const [, emit] = useEventBus;
let message = "";


const newMessageChangeHandler = (e: { target: { value: any; }; })=> {
  message = e.target.value
}

function addClickHandler() {
  emit("newMessageAdded", message);
  
}



export default class Footer extends Component {
  template = template;
  constructor(props: P) {
    super({ ...props, Button, Control, addClickHandler, newMessageChangeHandler});


  }

  
}
