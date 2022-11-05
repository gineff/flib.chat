import createContext, { useContext } from "./context";
import { Action, StateInterface } from "./reducer";

export type storeProviderType = { store: StateInterface<AppState>; dispatch: (action: Action) => void };

export const initialStore: AppState = {
  appIsInited: false,
  isLoading: false,
  screen: null,
  loginFormError: null,
  user: null,
};

export const StoreProvider = createContext();

export const storeReducer = (state: StateInterface<AppState>, action: Action) => {
  const store = state.getState();
  switch (action.type) {
    case "app_initializing":
      state.emit(action.type);
      break;
    case "app_initialized":
      state.setState({ ...store, ...action.payload });
      state.emit(action.type);
      break;      
    case "auth_get_login_data":
      state.setState({ ...store, ...action.payload });
      state.emit(action.type, action.payload);
      break;
    case "auth_get_server_response":
      state.setState({ ...store, ...action.payload });
      state.emit(action.type, action.payload);
      break;
    case "screeen_change":
      state.setState({ ...store, ...action.payload });
      state.emit("scrren_change");
      break;
    default:
    //return store
  }
};

export const useStoreContext = () => useContext(StoreProvider);
