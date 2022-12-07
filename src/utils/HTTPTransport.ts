const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

type METHODS = typeof METHODS[keyof typeof METHODS];

type TRequestData = Record<string, string | number>;

type TRequestOptions = {
  method?: METHODS;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  timeout?: number;
  data?: unknown;
};

export function queryStringify(data: TRequestData) {
  if (!data) return "";
  return (
    "?" +
    Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join("&")
  );
}

class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";
  public endpoint: string;

  constructor(endpoint?: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(url: string, options = {}): Promise<Response> {
    return this.request<Response>(url, { ...options, method: METHODS.GET });
  }

  public post<Response>(url: string, options = {}): Promise<Response> {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  public put<Response>(url: string, options = {}): Promise<Response> {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  public patch(url: string, options = {}) {
    return this.request(url, { ...options, method: METHODS.PATCH });
  }

  public delete<Response>(url: string, options = {}): Promise<Response> {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  request<Response>(url: string, options: TRequestOptions): Promise<Response> {
    url = `${this.endpoint}${url}`;

    const { method = METHODS.GET, headers = {}, data, timeout = 5000, withCredentials = true } = options;

    const query = method === METHODS.GET ? queryStringify(data as TRequestData) : "";

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url + query);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      xhr.onload = () => {
        if (xhr.status >= 300) {
          reject(xhr);
        } else {
          resolve(xhr as Response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.withCredentials = withCredentials;
      xhr.responseType = "json";

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
