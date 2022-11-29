import BaseApi from "./BaseApi";
import { APIError, User, SigninData, SignupData } from "./types";

export class AuthApi extends BaseApi {
  constructor() {
    super("/auth");
  }

  signin(data: SigninData) {
    return this.http.post("/signin", { data });
  }

  signup(data: SignupData) {
    return this.http.post("/signup", { data });
  }

  read(): Promise<{ response: User } | APIError> {
    return this.http.get("/user");
  }

  logout() {
    return this.http.post("/logout");
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthApi();
