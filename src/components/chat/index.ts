import Component from "../../utils/component";
import Messages from "./components/messages";
import List from "./components/list";
import SearchForm from "./components/search_form";
import Footer from "./components/footer";
import Header from "./components/header";

export { Messages, List, Header, SearchForm, Footer };

const template = "<div class='chat'>{{children}}</div>";
export default class Chat extends Component {
  constructor(props: P) {
    super({
      ...props,
      template,
      Messages,
      List,
      Header,
      SearchForm,
      Footer,
    });
  }
}
