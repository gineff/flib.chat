import BaseApi from "./BaseApi";
import { APIError, User, SigninData, SignupData } from "./types";

/*
type LoginRequestData = {
  login: string;
  password: string;
};

type LoginResponseData = Record<string, unknown> | APIError;

const request = new HTTPTransport();

export const authAPI = {
  login: (data: LoginRequestData) => request.post("auth/signin", { data, headers: { withCredentials: true } }),

  register: (data: LoginRequestData) => request.post("auth/signup", { data }),

  me: () => request.get("auth/user"),

  logout: () => request.post("auth/logout"),
};

export type APIError = {
  reason: string;
};

export type SigninData = {
  login: string;
  password: string;
}

export type SignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}
*/

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
