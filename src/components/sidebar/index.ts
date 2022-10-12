import Component from "../../utils/component";
import Header from "./components/header";
import Body from "./components/body";
import "./index.css";

export { Header, Body };

const template = "<div class='sidebar'>{{children}}</div>";
export default class Sidebar extends Component {
  constructor(props: P) {
    super({ ...props, template, Header, Body });
  }
}
