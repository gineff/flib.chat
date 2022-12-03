/* eslint-disable no-case-declarations */
import createContext, { useContext } from "./context";
import { Action, StateInterface } from "./reducer";
import { ChatT, Message, MessageT } from "api/types";
import { transformMessage } from "utils";

export type storeProviderType = { store: StateInterface<AppState>; dispatch: (action: Action) => void };

export const initialStore: AppState = {
  appIsInited: false,
  isLoading: false,
  formError: null,
  user: null,
  chats: null,
  messages: null,
  activeChat: null,
};

export type Payload = Partial<Omit<AppState, "messages">> & { chat?: ChatT; messages?: Message[] };

export const StoreProvider = createContext();

export const storeReducer = (state: StateInterface<AppState>, action: Action) => {
  const store = state.getState();
  const { formError, user, chat, chats, messages }: Payload = action.payload || ({} as Payload);
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
    case "user_update_info":
      return { ...store, user };
    case "chats_update_info":
      return { ...store, chats };
    case "chat_update_info":
      const newChats = [...(store.chats as unknown as ChatT[])].map((el) => (el.id === (chat as ChatT).id ? chat : el));
      return { ...store, chats: newChats };
    case "chat_select_active_chat":
      return { ...store, activeChat: chat };
    case "chat_get_messages":
      if (Array.isArray(messages)) {
        return { ...store, messages: messages.map((el) => transformMessage(el) as MessageT).reverse() };
      } else if (messages) {
        return { ...store, messages: [...(store.messages || []), transformMessage(messages)] };
      } else {
        return store;
      }
    default:
      return store;
  }
};

export const useStoreContext = () => useContext(StoreProvider);
