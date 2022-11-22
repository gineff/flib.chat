import BaseApi from "./BaseApi";
import { Chat } from "./types";


export type ChatRequestData = {
  offset: number;
  limit: number;
  title: string;
}

export type ChatUserRequestData = {
  offset: number;
  limit: number;
  name: string;
  email: string
}

export type RemoveChatResponseData = {
  userId: number,
  result: {
    id: number,
    title: string,
    avatar: string
  }
}

export class ChatApi extends BaseApi {
  constructor() {
    super("/chats");
  }

  read(data: ChatRequestData): Promise<{response: Chat[]}> {
    return this.http.get("/", {data});
  }
  create(title: string): Promise<{response: unknown}> {
    return this.http.post("/", { title });
  }
  delete(id: number): Promise<{response: RemoveChatResponseData}> {
    return this.http.delete("/", { chatId: id });
  }
  getUsers(id: number, data: ChatUserRequestData): Promise<{response: unknown}> {
    return this.http.get(`/${id}/users`, {data});
  }
  //GET /chats/new/:id — получить количество новых сообщений в указанном чате;
  updateAvatar(data: FormData) {
    return this.http.put("/avatar", {data, headers: { "Content-Type": "multipart/form-data" },});
  }
  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put("/users", { users, chatId: id });
  }
  //DELETE /chats/users — удалить пользователей из чата.


  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatApi();
