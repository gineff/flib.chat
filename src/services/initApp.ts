import { authAPI } from "api/auth";
//import { UserDTO } from "api/types";
//import { transformUser } from "utils/apiTransformers";
//import { apiHasError } from "utils/apiHasError";

export function initApp<S, D>(store: S, dispatch: D) {
  init<S, D>(store, dispatch);
  return { type: "app_initializing" };
}

async function init<S, D>(store: S, dispatch: D) {
  await new Promise((r) => setTimeout(r, 700));

  try {
    const response = await authAPI.me();

    if (response && response.reason) {
      return;
    }

    //  dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: "app_initialized", payload: { appIsInited: true } });
  }
}
