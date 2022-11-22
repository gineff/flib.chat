import chatApi, { ChatRequestData, RemoveChatResponseData } from "api/ChatApi";
import { APIError, User, UserT, Chat, ChatT } from "api/types";
import { navigate } from "utils/router";
import { transformChat, apiHasError } from "utils";

import { Dispatch } from "utils/reducer";

let dispatch: Dispatch;

export async function getChats(data: ChatRequestData) {
  try {
    dispatch({ type: "app_is_loading_on" });

    const response = await chatApi.read(data);

    const chats = response.response as Chat[];

    if (apiHasError(response)) {
      throw { response };
    }

    dispatch({ type: "chats_info", payload: { chats: chats.map((chat) => transformChat(chat)) } });
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

    await getChats({ offset: 0, limit: 0, title: title });
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

    const {
      response: { result },
    } = response as { response: RemoveChatResponseData };

    if (apiHasError(response)) {
      throw { response };
    }

    await getChats({ offset: 0, limit: 0, title: result.title });
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
    dispatch({ type: "app_is_loading_on" });

    const response = await chatApi.getUsers(id);
    const users = response.response as User & { role: string }[];

    if (apiHasError(response)) {
      throw { response };
    }

    //await getChats({ offset: 0, limit: 0, title: result.title });
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

export function initController(_dispatch: Dispatch) {
  dispatch = _dispatch;
}
