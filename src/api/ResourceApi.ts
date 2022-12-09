
import BaseApi from "./BaseApi";
import { APIError, Response } from "./types";

export class ResourceApi extends BaseApi {
  constructor() {
    super("/resources");
  }

  create(data: FormData): Promise<Response> {
    return this.http.post("/", { data });
  }

  read(path: string): Promise<Response| APIError> {
    return this.http.get("/"+path);
  }

  update = undefined;
  delete = undefined;
}

export default new ResourceApi();
