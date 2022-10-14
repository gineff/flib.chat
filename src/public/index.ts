import Home from "pages/home";
import Login from "pages/login";
import Register from "pages/register";
import Er500 from "pages/er500";
import Er404 from "pages/er404";
import Chat from "pages/chat";
import Profile from "pages/profile";

const root = document.getElementById("root");

if(root) {
  root.innerHTML = "";

  const path = document.location.pathname.slice(1);
  let component;
  
  switch (path) {
    case "":
      component = new Home();
      break;
    case "login":
      component = new Login();
      break;
    case "register":
      component = new Register();
      break;
    case "profile":
      component = new Profile();
      break;
    case "chat":
      component = new Chat();
      break;
    case "404":
      component = new Er404();
      break;
    case "500":
      component = new Er500();
      break;
    default:
      component = new Er404();
  }
  
  root.append(component.getContent());
}
