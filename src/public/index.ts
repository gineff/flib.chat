// import Home from "pages/home";
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
import useReducer from "utils/reducer";

const root = document.getElementById("root");

// <StoreProvider store={{store}} dispatch={{dispatch}}>
const template = /*html*/ `
    <RouterProvider>
      <Route path="/"><Redirect to="/chat" /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/register"><Register /></Route>
      <Route path="/profile"><Profile /></Route>
      <Route path="/chat"><Chat /></Route>
      <Route path="/404"><Er404 /></Route>
      <Route path="/500"><Er500 /></Route>
      <Route path="/home"><Home /></Route>
    </RouterProvider>`;

const [store, dispatch] = useReducer(storeReducer, initialStore);

const app = new Component({
  store,
  dispatch,
  template,
  StoreProvider,
  RouterProvider,
  Login,
  Register,
  Profile,
  Chat,
  Er404,
  Er500,
  Home,
});

if (root) {
  root.innerHTML = "";
  root.append(app.getContent());
}
