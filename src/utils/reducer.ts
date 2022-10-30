import EventBus from "./EventBus";

export type Listener<T extends unknown[] = any[]> = (...args: T) => typeof State;

export type Action = {
  type: string;
  payload: Record<string, unknown>;
};

export type Reducer<R> = (state: StateInterface<R>, action: Action) => R;

/*
export interface StateConstructor<S> {
  new (): State<S>;
}
*/

export interface StateInterface<U> {
  state: U;

  getState(): U;

  setState(nextState: Partial<U>): void;
}

export class State<T> extends EventBus implements StateInterface<T> {
  //export class State<StateBlank extends Record<string, unknown>>  extends EventBus {
  state: T = {} as T;

  constructor(initialStore: T) {
    super();
    this.state = initialStore;
  }

  public getState() {
    return this.state;
  }

  public setState(nextState: Partial<T>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit("changed", prevState, nextState);
  }
}

//State = InitialState
export default function useReducer<T>(stateReducer: Reducer<T>, initialState: T) {
  const state = new State<T>(initialState);

  const dispatch = (action: Action) => {
    //const newState: Record<string, any> = stateReducer(state, action);
    state.setState(stateReducer(state, action));
  };

  return [state, dispatch];
}
