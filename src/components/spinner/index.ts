import Component from "utils/component";
import template from "./index.tem";
import { useStoreContext } from "utils/store";
import "./index.css";

export class Spinner extends Component {
  constructor(props: P) {
    super({ ...props, template });
    this.element.style.display = "none";

    const { store } = useStoreContext();
    if (store === undefined) return;

    const switchSpenner = () => {
      const switchKey = this.props.switchKey;
      const switchValue = store.getValue(switchKey);

      if (switchValue) {
        this.show();
      } else {
        this.hide();
      }
    };

    store.on("changed", switchSpenner);
    this.eventBus().on(Component.EVENTS.FLOW_CWU, () => store.off("changed", switchSpenner));
  }
}

