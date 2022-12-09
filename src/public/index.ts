import Login from "pages/login";
import Register from "pages/register";
import Er500 from "pages/er500";
import Er404 from "pages/er404";
import Chat from "pages/chat";
import Profile from "pages/profile";
import Home from "pages/home";
import Component from "utils/component";
import { RouterProvider } from "utils/router";
import { StoreProvider, storeReducer, initialStore } from "utils/store";
import useReducer, { StateInterface, Dispatch } from "utils/reducer";
import { initApp } from "services/initApp";
import renderDOM from "utils/renderDOM";
import { Spinner } from "components/spinner";
import "./index.css";
import "./variables.css";

const [store, dispatch]: [StateInterface<AppState>, Dispatch] = useReducer<AppState>(storeReducer, initialStore);

const App = class extends Component {
  constructor() {
    super({
      store,
      dispatch,
      StoreProvider,
      RouterProvider,
      Login,
      Register,
      Profile,
      Chat,
      Er404,
      Er500,
      Home,
      Spinner,
    });
  }
  
  render() {
    return /*html*/ `
      <StoreProvider store={{store}} dispatch={{dispatch}}>  
        <RouterProvider>
          <Route path="/"><Redirect to="/login" /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/profile"><Profile /></Route>
          <Route path="/chat"><Chat /></Route>
          <Route path="/404"><Er404 /></Route>
          <Route path="/500"><Er500 /></Route>
          <Route path="/home"><Home /></Route>
          <Spinner switchKey="isLoading"/>
        </RouterProvider>
      </StoreProvider>`;
  }
};

const app = new App();

renderDOM(app as Component);

initApp(dispatch);
