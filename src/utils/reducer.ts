import EventBus from "./EventBus";
export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

const State = class State <State extends Record<string, any>> extends EventBus {

};

export default function (storeReducer: Listener, initialStore: AppState) {
  //const state = initialStore;
  const eventBus = new State<AppState>();
  eventBus.state = initialStore;

  const dispatch = (action, payload) => {};

  return [state, dispatch];
}
