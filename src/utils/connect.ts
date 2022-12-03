import Component, { ComponentClass } from "utils/component";
import { useStoreContext } from "utils/store";
import { StateInterface } from "utils/reducer";

export default function connect<T>(
  WrappedComponent: ComponentClass<T>,
  mapStateToState: (state: StateInterface<AppState>) => Record<string, unknown>
) {
  return class extends WrappedComponent {
    constructor(props: P) {
      super(props);
      const { store } = useStoreContext();
      if (store === undefined) return;

      const setState = () => {
        this.setState(mapStateToState(store));
      };
      store.on("changed", setState);
      this.eventBus().on(Component.EVENTS.FLOW_CWU, () => store.off("changed", setState));
    }
  };
}
