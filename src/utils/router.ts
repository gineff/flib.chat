import Component from "./component";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Er500 from "../pages/er500";
import Er404 from "../pages/er404";
import Chat from "../pages/chat";
import Profile from "../pages/profile";


 type Foo =  {
  [key: string]: any ;
}

const routes: Foo = {
  login: Login,
  register: Register,
  chat: Chat,
  profile: Profile,
  "404": Er404,
  "500": Er500,
  home: Home,
};

function render(Comp: typeof Component) {
  const component = new Comp();
  const root = document.getElementById("root");
  root!.innerHTML = "";
  const result = component.render();
  root!.append(result);
}


export default function route() {
  const path: string = document.location.pathname.slice(1);
  let route;

  if (path === "") {
    route = Home;
  } else {
    route = routes[path] ?? Er404
  }

  render(route);

}
