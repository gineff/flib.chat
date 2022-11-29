import BaseApi from "./BaseApi";
import { Chat } from "./types";

export type ChatRequestData = {
  offset: number;
  limit: number;
  title: string;
};

export type ChatUserRequestData = {
  offset: number;
  limit: number;
  name: string;
  email: string;
};

export type RemoveChatResponseData = {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  };
};

export class ChatApi extends BaseApi {
  constructor() {
    super("/chats");
  }

  read(data?: ChatRequestData): Promise<{ response: Chat[] }> {
    return this.http.get("/", { data });
  }
  create(title: string): Promise<{ response: unknown }> {
    return this.http.post("/", { data: { title } });
  }
  delete(id: number): Promise<{ response: RemoveChatResponseData }> {
    return this.http.delete("/", { data: { chatId: id } });
  }
  getUsers(id: number, data?: ChatUserRequestData): Promise<{ response: unknown }> {
    return this.http.get(`/${id}/users`, { data });
  }
  //GET /chats/new/:id — получить количество новых сообщений в указанном чате;
  updateAvatar(data: FormData): Promise<{ response: unknown }> {
    return this.http.put("/avatar", { data });
  }
  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put("/users", { data: { users, chatId: id } });
  }
  deleteUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete("/users", { data: { users, chatId: id } });
  }

  getToken(id: number): Promise<{ response: { token: string } }> {
    return this.http.post(`/token/${id}`);
  }

  update = undefined;
}

export default new ChatApi();
