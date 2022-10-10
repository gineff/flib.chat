import Component from "../../utils/component";
import Header from "./components/header";
import Body from "./components/body";
import "./index.css";

export { Header, Body };

export default class Sidebar extends Component {
  template = "<div class='sidebar'>{{children}}</div>";
}
