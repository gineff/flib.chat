import createContext, {useContext} from "./context";

export const StoreProvider = createContext();

export const initialStore = { screen: "/" };

export const storeReducer = (store, action) => {
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

export const useStoreContext = ()=> useContext(storeReducer)
