import { initController, getUser } from "./authController";
import { Dispatch } from "utils/reducer";
import { navigate } from "utils/router";

const paths = ["/login", "/register"];

export async function initApp(dispatch: Dispatch) {
  try {
    const user = await getUser();
    dispatch({ type: "auth_get_user_info", payload: { user } });

    if (paths.includes(window.location.pathname)) {
      navigate("/chat");
    }
  } catch (err: unknown) {
    initController(dispatch);
  } finally {
    dispatch({ type: "app_initialized" });
  }
}
