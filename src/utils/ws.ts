import { ChatT, UserT } from "api/types";
import { Dispatch } from "./reducer";

enum SocketEvents {
  Open = "open",
  Close = "close",
  Message = "message",
  Error = "error",
}

type SocketEvent = {
  message: string;
  code: number;
  wasClean: boolean;
  reason: string;
};

export default class WS {
  socket: WebSocket | undefined;
  token: string | undefined;
  chatId: number | null = null;
  ping: number | undefined;
  dispatch: Dispatch | undefined;

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;
    this.socketClose = this.socketClose.bind(this);
    this.socketMessage = this.socketMessage.bind(this);
    this.socketOpen = this.socketOpen.bind(this);
    this.socketError = this.socketError.bind(this);
  }

  init(props: Pick<AppState, "user" | "activeChat"> & { token: string }) {
    const { token, user, activeChat } = props;

    this.token = token;
    const { id: chatId } = activeChat as ChatT;
    const { id: userId } = user as UserT;
    if (this.chatId !== chatId) {
      this.close();
      this.chatId = chatId;
      this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${this.token}`);
      this._addListeners();
    }
  }

  private socketOpen() {
    if (this.socket) {
      this.socket?.send(JSON.stringify({ content: "0", type: "get old" }));

      this.ping = window.setInterval(() => {
        this.socket?.send(JSON.stringify({ type: "ping" }));
      }, 10000);
    }
  }

  private socketMessage(event: any) {
    const messages = JSON.parse(event.data);
    if (!this.dispatch) return;
    if (messages.type !== "pong" && messages.type !== "user connected") {
      this.dispatch({ type: "chat_get_messages", payload: { messages } });
    }
  }

  private socketError(event: unknown) {
    console.log((event as SocketEvent).message);
  }

  private socketClose(event: unknown) {
    const { wasClean, code, reason } = event as SocketEvent;
    if (wasClean) {
      console.log("socket closed clean");
    } else {
      console.log(`socket dropped, code: ${code}, ${reason}`);
    }
    clearInterval(this.ping);
    this._removeListeners();
  }

  private _addListeners() {
    if (this.socket) {
      this.socket.addEventListener(SocketEvents.Open, this.socketOpen);
      this.socket.addEventListener(SocketEvents.Close, this.socketClose);
      this.socket.addEventListener(SocketEvents.Message, this.socketMessage);
      this.socket.addEventListener(SocketEvents.Error, this.socketError);
    }
  }
  private _removeListeners() {
    if (this.socket) {
      this.socket.addEventListener(SocketEvents.Open, this.socketOpen);
      this.socket.addEventListener(SocketEvents.Close, this.socketClose);
      this.socket.addEventListener(SocketEvents.Message, this.socketMessage);
      this.socket.addEventListener(SocketEvents.Error, this.socketError);
    }
  }

  private close() {
    if (this.socket) {
      clearInterval(this.ping);
      this.socket.close();
      this._removeListeners();
    }
  }

  sendMessage(content: string) {
    if (this.socket) {
      this.socket?.send(
        JSON.stringify({
          content,
          type: typeof content === "string"? "message" : "file",
        })
      );
    }
  }
}
