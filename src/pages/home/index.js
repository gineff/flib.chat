/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import template from "./index.tem";
import { goToElementHref } from "../../utils";
import Component from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Button from "../../components/button";
import "./index.css";

window.goToPage = (element) => {
  const href = element.nextSibling.getAttribute("href");
  if (href !== undefined) window.location = href;
};

export default class Home extends Component {
  constructor(props) {
    super({ ...props, Wrapper, Button, goToElementHref, template });

    const pages = [
      { name: "login", href: "/login.html", title: "Страница авторизации", src: "/images/login.png" },
      { name: "register", href: "/register.html", title: "Страница регистрации", src: "/images/register.png" },
      { name: "chat", href: "/chat.html", title: "Чат", src: "/images/chat.png" },
      { name: "profile", href: "/profile.html", title: "Профиль", src: "/images/profile.png" },
      { name: "404", href: "/404.html", title: "404", src: "/images/404.png" },
      { name: "500", href: "/500.html", title: "500", src: "/images/500.png" },
    ];

    const pagesLink = pages
      .map(
        ({ href, src, title }) =>
          `<div class="page-home__page">
          <image class="page-home__image" src="${src}" onclick="goToPage(this)"/>
          <a class= "page-home__link" href="${href}">${title}</a>
        </div>`
      )
      .join("\n");

    this.state = { ...this.state, pagesLink };
  }

  render() {
    return super.render();
  }
}

const component = new Home();
const root = document.getElementById("root");
root.innerHTML = "";
const result = component.render();
root.append(result);
