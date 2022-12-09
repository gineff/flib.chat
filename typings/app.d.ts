import { UserT, ChatT, MessageT } from "api/types";

declare global {
  export type Nullable<T> = T | null;
  export type P = Record<[key: string], unknown>;
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed<T = any> = {
    [key in string]: T;
  }

  export type AppState = {
    appIsInited: boolean;
    isLoading: boolean;
    formError: string | null;
    user: UserT | null;
    chats: ChatT[] | null ;
    messages: MessageT[] | null,
    activeChat: ChatT | null 
  };

  export type Formdata = { [x: string]: string }[];
}

export {};
