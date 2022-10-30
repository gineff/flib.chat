import createContext, {useContext} from "./context";
import { Action, StateInterface } from "./reducer";

export const StoreProvider = createContext();


export const storeReducer  = (state: StateInterface<AppState>, action: Action) => {
  const store = state.getState()
  switch(action.type) {
    case "screeen_change":
        return {
            ...store,
            ...action.payload
        };
    default:
        return store
  }
};

export const useStoreContext = ()=> useContext(StoreProvider)


export const initialStore: AppState = {
  appIsInited: false,
  isLoading: false,
  screen: null,
  loginFormError: null,
  user: null,
};
