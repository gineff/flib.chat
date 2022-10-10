import messages from "../../static/json/messages.json";

export default async function fetchData(path: string, options: any): Promise<any[]> {
  if (path.slice(1, 6) === "chats") {
    const match = path.match(/\/chats\/(\d+)/)
    const chatId = match![1];
    return messages.filter((message: any) => message.chat_id == chatId);
  }

  return [];
}
