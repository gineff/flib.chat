import HTTPTransport from "utils/HTTPTransport";

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<{response: unknown}>;

  public abstract read?(data: unknown): Promise<{response: unknown}>;

  public abstract update?(identifier: string, data: unknown): Promise<{response: unknown}>;

  public abstract delete?(identifier: string | number): Promise<{response: unknown}>;
}
