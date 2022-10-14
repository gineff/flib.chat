import messages from "static/json/messages.json";

export default async function fetchData(path: string): Promise<message[]> {
  if (path.slice(1, 6) === "chats") {
    const match = path.match(/\/chats\/(\d+)/);
    if(match) {
      const chatId = Number(match[1]);
      return messages.filter((message: message) => message.chat_id === chatId);
    }else{
      return [];
    }

  }

  return [];
}
