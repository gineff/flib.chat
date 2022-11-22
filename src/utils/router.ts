import Provider from "utils/provider";
import Component from "utils/component";
import { useEventBus } from "utils";

const [on, emit] = useEventBus;

export const Link = class Link extends Provider {
  onClick() {
    emit("router_navigate", this.props.to);
  }

  componentDidMount(): void {
    this.element.childNodes.forEach((element) => {
      element.addEventListener("click", this.onClick.bind(this));
    });
  }
};

export const Redirect = class Redirect extends Provider {
  init() {
    emit("router_navigate", this.props.to);
  }
};

export const Route = class Route extends Provider {
  init() {
    if (window.location.pathname === this.props.path) {
      super.init();
    }
  }
};

export const RouterProvider = class RouterProvider extends Component {
  constructor(props: P) {
    super({ ...props, Route, Redirect });
  }
  init() {
    on("router_navigate", (pathname: string) => {
      window.history.pushState({}, "", pathname);
      this._render();
    });
    window.onpopstate = () => this._render();
    super.init();
  }
};

export const navigate = (pathname: string) => {
  emit("router_navigate", pathname);
};

export const go = (direction: string | number) => {
  switch (direction) {
    case "forward":
      window.history.forward();
      break;
    case "back":
      window.history.back();
      break;
    default:
      window.history.go(direction as number);
  }
};
