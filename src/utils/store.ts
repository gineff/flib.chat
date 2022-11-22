import createContext, { useContext } from "./context";
import { Action, StateInterface } from "./reducer";
import { UserT } from "api/types";

export type storeProviderType = { store: StateInterface<AppState>; dispatch: (action: Action) => void };

export const initialStore: AppState = {
  appIsInited: false,
  isLoading: false,
  formError: null,
  user: null,
};

export type Payload = {
  formError?: string;
  user?: UserT;
  appIsInited?: boolean;
  isLoading?: boolean;
};

export const StoreProvider = createContext();

export const storeReducer = (state: StateInterface<AppState>, action: Action) => {
  const store = state.getState();

  const { formError, user } = action.payload || ({} as Payload);

  switch (action.type) {
    case "app_initialized":
      return { ...store, appIsInited: true };
    case "app_is_loading_on":
      return { ...store, isLoading: true };
    case "app_is_loading_off":
      return { ...store, isLoading: false };
    case "auth_error":
      return { ...store, formError };
    case "auth_logout":
      return { ...store, user: null };
    case "auth_get_user_info":
      return { ...store, user };
    case "user_upadte_info": 
      return { ...store, user };
    default:
      return store;
  }
};

export const useStoreContext = () => useContext(StoreProvider);
