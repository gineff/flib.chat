/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import template from "./index.tem";
import { goToElementHref } from "../../utils";
import Component from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Button from "../../components/button";
import "./index.css";

window.goToPage = (element: HTMLElement) => {
  const href = element.nextSibling.getAttribute("href");
  if (href !== undefined) window.location = href;
};

export default class Home extends Component {
  protected template = template;
  constructor(props: P) {
    super({ ...props, Wrapper, Button, goToElementHref });

    const pages = [
      { name: "login", href: "/login", title: "Страница авторизации", src: "/images/login.png" },
      { name: "register", href: "/register", title: "Страница регистрации", src: "/images/register.png" },
      { name: "chat", href: "/chat", title: "Чат", src: "/images/chat.png" },
      { name: "profile", href: "/profile", title: "Профиль", src: "/images/profile.png" },
      { name: "404", href: "/404", title: "404", src: "/images/404.png" },
      { name: "500", href: "/500", title: "500", src: "/images/500.png" },
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
