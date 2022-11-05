import EventBus from "./EventBus";

export type Listener<T extends unknown[] = unknown[]> = (...args: T) => typeof State;

export type Action = {
  type: string;
  payload?: Record<string, unknown>;
};

//export type ActionCreator = (state)

export type Dispatch = (action: Action) => void;

export type Reducer<R> = (state: StateInterface<R>, action: Action) => void;

/*
export interface StateConstructor<S> {
  new (): State<S>;
}
*/

export interface StateInterface<U> extends EventBus {
  state: U;

  getState(): U;

  setState(nextState: Partial<U>): void;
}

export class State<T> extends EventBus implements StateInterface<T> {
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

  const dispatch: Dispatch = (action: Action) => {
    stateReducer(state, action);
  };
  const response: [StateInterface<T>, Dispatch] = [state, dispatch];
  return response;
}
