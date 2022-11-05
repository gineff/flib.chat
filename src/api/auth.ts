import HTTPTransport from "utils/HTTPTransport";
import { APIError, UserDTO } from "./types";

type LoginRequestData = {
  login: string;
  password: string;
};

type LoginResponseData = Record<string, unknown> | APIError;

const request = new HTTPTransport();

export const authAPI = {
  login: (data: LoginRequestData) =>
    request.post("auth/signin", data),

  me: () => request.get("auth/user"),

  logout: () => request.post("auth/logout"),
};
