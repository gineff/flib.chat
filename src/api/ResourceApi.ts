
import BaseApi from "./BaseApi";
import { APIError, File } from "./types";

export class ResourceApi extends BaseApi {
  constructor() {
    super("/resources");
  }

  create(data: FormData): Promise<{response: File}> {
    return this.http.post("/", { data });
  }

  read(path: string): Promise<{ response: unknown } | APIError> {
    return this.http.get("/"+path);
  }

  update = undefined;
  delete = undefined;
}

export default new ResourceApi();
