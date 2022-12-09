import BaseApi from "./BaseApi";
import { APIError, Response, ProfileData, PasswordData } from "./types";

export type SearchUserData = {
  login: string;
};

export class UserApi extends BaseApi {
  constructor() {
    super("/user");
  }

  updateProfile(data: ProfileData): Promise<Response | APIError> {
    return this.http.put("/profile", { data });
  }

  updateAvatar(data: FormData): Promise<Response | APIError> {
    return this.http.put("/profile/avatar", { data });
  }

  updatePassword(data: PasswordData) {
    return this.http.put("/password", { data });
  }

  getById(userId: number): Promise<Response | APIError> {
    return this.http.get(`/${userId}`);
  }

  search(data: SearchUserData): Promise<Response | APIError> {
    return this.http.post("/search", { data });
  }

  read = undefined;
  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new UserApi();
