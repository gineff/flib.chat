import Component from "../../utils/component";
import Messages from "./components/messages";
import List from "./components/list";
import SearchForm from "./components/search_form";
import Footer from "./components/footer";
import Header from "./components/header";
import "./index.css";

export { Messages, List, Header, SearchForm, Footer };

export default class Chat extends Component {
  protected template = "<div class='chat'>{{children}}</div>";
  constructor(props: P) {
    super({
      ...props,
      Messages,
      List,
      Header,
      SearchForm,
      Footer
    });
  }
}
