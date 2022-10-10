import Component from "../../utils/component";
import Header from "./components/header";
import Footer from "./components/footer";
import Body from "./components/body";
import Group from "./components/group";
import Label from "./components/label";
import Control from "./components/control";
import template from "./index.tem";
import "./index.css";

export { Header, Footer, Body, Group, Label, Control };

export default class Form extends Component {
  template = template;
  constructor(props: P) {
    super({...props, Header, Footer, Body, Group, Label, Control });
  }
}
