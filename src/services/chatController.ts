import chatApi, { ChatRequestData } from "api/ChatApi";
import { APIError, User, Chat } from "api/types";
import { transformChat, apiHasError } from "utils";

import { Dispatch } from "utils/reducer";

let dispatch: Dispatch;

export async function getChats(data?: ChatRequestData) {
  try {
    dispatch({ type: "app_is_loading_on" });

    const response = await chatApi.read(data);
    const chats = response.response as Chat[];

    if (apiHasError(response)) {
      throw { response };
    }

    dispatch({ type: "chats_update_info", payload: { chats: chats.map((chat) => transformChat(chat)) } });
  } catch (err) {
    const {
      response: { reason },
    } = err as APIError;

    dispatch({ type: "auth_error", payload: { formError: reason } });
    console.error(err);
  } finally {
    dispatch({ type: "app_is_loading_off" });
  }
}

export async function createChat(title: string) {
  try {
    dispatch({ type: "app_is_loading_on" });

    const response = await chatApi.create(title);

    if (apiHasError(response)) {
      throw { response };
    }

    await getChats();
  } catch (err) {
    const {
      response: { reason },
    } = err as APIError;

    dispatch({ type: "auth_error", payload: { formError: reason } });
    console.error(err);
  } finally {
    dispatch({ type: "app_is_loading_off" });
  }
}

export async function removeChat(id: number) {
  try {
    dispatch({ type: "app_is_loading_on" });

    const response = await chatApi.delete(id);

    if (apiHasError(response)) {
      throw { response };
    }

    await getChats();
  } catch (err) {
    const {
      response: { reason },
    } = err as APIError;

    dispatch({ type: "auth_error", payload: { formError: reason } });
    console.error(err);
  } finally {
    dispatch({ type: "app_is_loading_off" });
  }
}

export async function getUsers(id: number) {
  try {
    const response = await chatApi.getUsers(id);
    const users = response.response as User & { role: string }[];

    if (apiHasError(response)) {
      throw { response };
    }
    return users;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function addUsers(chatId: number, users: number[]) {
  try {
    const response = await chatApi.addUsers(chatId, users);

    if (apiHasError(response)) {
      throw { response };
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function removeUsers(chatId: number, users: number[]) {
  try {
    const response = await chatApi.deleteUsers(chatId, users);

    if (apiHasError(response)) {
      throw { response };
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function updateAvatar(data: FormData) {
  try {
    dispatch({ type: "app_is_loading_on" });
    const response = await chatApi.updateAvatar(data);

    if (apiHasError(response)) {
      throw { response };
    }

    const chat = response.response as Chat;

    if (apiHasError(response)) {
      throw { response };
    }

    dispatch({ type: "chat_update_info", payload: { chat: transformChat(chat) } });
  } catch (err) {
    const {
      response: { reason },
    } = err as APIError;

    dispatch({ type: "auth_error", payload: { formError: reason } });
    console.error(err);
  } finally {
    dispatch({ type: "app_is_loading_off" });
  }
}

export async function getToken(data: number) {
  const response = await chatApi.getToken(data);
  const {token} = response.response as {token: string};
  return token;
}

export function initController(_dispatch: Dispatch) {
  dispatch = _dispatch;
}
