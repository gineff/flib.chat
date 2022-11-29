import userApi from "api/UserApi";
import { APIError, User, UserT, ProfileData, ProfileDataT, PasswordData } from "api/types";
import { Dispatch } from "utils/reducer";
import { transformUser, transformUserT, apiHasError } from "utils";

let dispatch: Dispatch;

export async function updateProfile(data: ProfileDataT) {
  try {
    dispatch({ type: "app_is_loading_on" });
    dispatch({ type: "auth_error", payload: { formError: null } });
    const profile = Object.fromEntries(
      Object.entries(transformUserT(data as unknown as UserT)).filter((el) => el[1] !== undefined)
    ) as ProfileData;

    const response = await userApi.updateProfile(profile);

    const user = response.response as User;

    if (apiHasError(response)) {
      throw { response };
    }

    dispatch({ type: "user_update_info", payload: { user: transformUser(user) } });
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

export async function updateAvatar(data: FormData) {
  try {
    dispatch({ type: "app_is_loading_on" });
    dispatch({ type: "auth_error", payload: { formError: null } });
    const response = await userApi.updateAvatar(data);

    if (apiHasError(response)) {
      throw { response };
    }

    const user = response.response as User;

    if (apiHasError(response)) {
      throw { response };
    }

    dispatch({ type: "user_update_info", payload: { user: transformUser(user) } });
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

export async function updatePassword(data: PasswordData) {
  try {
    dispatch({ type: "app_is_loading_on" });
    dispatch({ type: "auth_error", payload: { formError: null } });
    const response = await userApi.updatePassword(data);

    if (apiHasError(response)) {
      throw { response };
    }
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

export async function searchUser(login: string) {
  try {

    const response = await userApi.search({login});

    if (apiHasError(response)) {
      throw { response };
    }

    return response.response.map(user=> transformUser(user)) 
  } catch (err) {
    console.log(err);
    return false;
  } 
}

export function initController(_dispatch: Dispatch) {
  dispatch = _dispatch;
}
