import { User, UserT, Chat, ChatT, APIError, PasswordData } from "api/types";

export function transformUser(data: User): UserT {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
}

export function transformUserT(data: UserT): User {
  return {
    id: data.id,
    login: data.login,
    first_name: data.firstName,
    second_name: data.secondName,
    display_name: data.displayName,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
}

export function transformChat(data: Chat): ChatT {
  return {
    id: data.id,
    title: data.title,
    avatar: data.avatar,
    unreadCount: data.unread_count,
    lastMessage: data.last_message,
  };
}

export function transformPassword(data:  Record<string, string>): PasswordData {
  return {
    oldPassword: data.oldPassword,
    newPassword: data.password
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValue(path: string, obj: any): unknown {
  const keys = path.trim().split(".");
  let result = obj;

  try {
    for (const key of keys) {
      const match = key.match(/^(\w+)\[(\d+)\]$/);
      if (match) {
        result = result[match[1]][match[2]];
      } else {
        result = result[key];
      }
    }

    return result;
  } catch (e) {
    return undefined;
  }
}

export function apiHasError(response: unknown): response is APIError {
  return response && response.reason;
}

export const goToElementHref = (event: { target: HTMLButtonElement }): void => {
  const { target } = event;
  const href = target.getAttribute("href");
  if (href) {
    window.location.assign(href);
  }
};

// eslint-disable-next-line no-underscore-dangle
const _context = new Array(1);

export const setContext = (el: unknown): number => _context.push(el) - 1;
export const getContext = (i: number): unknown => _context[i];

export const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

let id = 1;

// eslint-disable-next-line no-plusplus
export const nextId = (): number => id++;

export const stringifyProps = (props: P, keys?: string[]) =>
  Object.entries(props)
    .reduce((prev, [key, value]) => {
      if ((keys && !keys.includes(key)) || value === undefined) {
        return prev;
      }
      if (typeof value === "function") {
        return `${prev} ${key}=context:${setContext(value)}`;
      }
      return `${prev} ${key}="${value}"`;
    }, "")
    .trim();

const eventMap = new Map();

// ToDo cb: Function
const on = (key: string, cb: unknown) => {
  let handlers = eventMap.get(key);
  if (!handlers) {
    handlers = [];
  }
  handlers.push(cb);
  eventMap.set(key, handlers);
};

const emit = (key: string, payload: unknown) => {
  const handlers = eventMap.get(key);
  if (!Array.isArray(handlers)) return;
  handlers.forEach((handler) => {
    handler(payload);
  });
};

export const useEventBus = [on, emit];

//export { uid, nextId, goToElementHref, stringifyProps, getContext, setContext, useEventBus };
