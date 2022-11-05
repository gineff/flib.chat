declare global {
  export type Nullable<T> = T | null;
  export type P = Record<[key: string], unknown>;
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type chat = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
      user: number;
      time: string;
      content: string;
    };
  };

  enum messageType {
    "file",
    "message",
  }

  export type message = {
    id: number;
    user_id: number;
    chat_id: number;
    date: string;
    type: messageType;
    content: string;
    file: {
      id: number;
      user_id: number;
      path: string;
      filename: string;
      content_type: string;
      content_size: number;
      upload_date: string;
    } | null;
  };

  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    isLoading: boolean;
    loginFormError: string | null;
    user: User | null;
  };

  export type Dispatch = (action: Action) => void;

  export type Action = {
    type: string;
    payload?: Record<string, unknown>;
  };

  export interface StateInterface<U> extends EventBus {
    state: U;
  
    getState(): U;
  
    setState(nextState: Partial<U>): void;
  }

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };
  
}

export {};
