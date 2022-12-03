import EventBus from "./EventBus";
import { getValue } from "utils";
export type Listener<T extends unknown[] = unknown[]> = (...args: T) => typeof State;

export type Action = {
  type: string;
  payload?: Record<string, unknown>;
};

export type Dispatch = (action: Action) => void;

export type Reducer<R> = (state: StateInterface<R>, action: Action) => any;

export type ActionCreator<State> = (dispatch: Dispatch, state: State, payload: unknown) => void;

export interface StateInterface<U> extends EventBus {
  state: U;

  getState(): U;

  getValue(key: string): Partial<U> | undefined;

  setState(nextState: U): void;
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

  public getValue(key: string) {
    return getValue(key, this.state) as Partial<T> | undefined;
  }

  public setState(nextState: T) {
    const prevState = { ...this.state };
    this.state = nextState;
    this.emit("changed", prevState, nextState);
  }
}

export default function useReducer<T>(stateReducer: Reducer<T>, initialState: T) {
  const state: StateInterface<T> = new State(initialState);

  const dispatch: Dispatch = (action: Action) => {
    const newState = stateReducer(state, action);
    state.setState(newState);
  };
  const response: [StateInterface<T>, Dispatch] = [state, dispatch];
  return response;
}
