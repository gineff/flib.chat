import authApi from "api/AuthApi";
import { APIError, User, SigninData, SignupData } from "api/types";
import { Dispatch } from "utils/reducer";
import { navigate } from "utils/router";
import { transformUser, apiHasError } from "utils";

const AUTH_ERRORS = {
  USER_ALREADY_IN_SYSTEM: "User already in system",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  COOKIE_IS_NOT_VALID: "Cookie is not valid",
} as const;

let dispatch: Dispatch;

export async function getUser() {
  const responseUser = await authApi.read();
  const user = responseUser.response as User;

  if (apiHasError(responseUser)) {
    throw { responseUser };
  }
  return transformUser(user);
}

export async function signin(data: SigninData) {
  dispatch({ type: "app_is_loading_on" });
  dispatch({ type: "auth_error", payload: { formError: null } });

  await new Promise((r) => setTimeout(r, 700));

  try {
    const response = await authApi.signin(data);

    if (apiHasError(response)) {
      throw { response };
    }

    const user = await getUser();
    dispatch({ type: "auth_get_user_info", payload: { user } });
    navigate("/chat");
  } catch (err: unknown) {
    const {
      response: { reason },
    } = err as APIError;

    if (reason === AUTH_ERRORS.USER_ALREADY_IN_SYSTEM) {
      navigate("/chat");
    } else {
      dispatch({ type: "auth_error", payload: { formError: reason } });
    }
  } finally {
    dispatch({ type: "app_is_loading_off" });
  }
}

export async function signup(data: SignupData) {
  dispatch({ type: "app_is_loading_on" });
  dispatch({ type: "auth_error", payload: { formError: null } });

  await new Promise((r) => setTimeout(r, 700));

  try {
    const response = await authApi.signup(data);

    if (apiHasError(response)) {
      throw { response };
    }

    const user = await getUser();
    dispatch({ type: "auth_get_user_info", payload: { user } });
    navigate("/profile");
  } catch (err: unknown) {
    const { response } = err as APIError;
    dispatch({ type: "auth_error", payload: { formError: response.reason } });
  } finally {
    dispatch({ type: "app_is_loading_off" });
  }
}

export const logout = async () => {
  dispatch({ type: "isLoading_on" });
  await authApi.logout();
  dispatch({ type: "auth_logout" });
  dispatch({ type: "isLoading_off" });
  navigate("/login");
};

export function initController(_dispatch: Dispatch) {
  dispatch = _dispatch;
}
