import messages from "../../static/json/messages.json";

export default async function fetchData(path) {
  if (path.slice(1, 6) === "chats") {
    console.log(path, path.slice(1, 6), path.match(/\/chats\/(\d+)/)[1]);
    const chatId = path.match(/\/chats\/(\d+)/)[1];
    return messages.filter((message) => message.chat_id == chatId);
  }

  return [];
}

/*
  return new Promise((resolve) => {
    if (path.slice(1, 6) === "chats") {
      console.log(path, path.slice(1, 6), path.match(/\/chats\/(\d+)/)[1]);
      const chatId = path.match(/\/chats\/(\d+)/)[1];
      resolve(messages.filter((message) => message.chat_id == chatId));
    }
  });

*/
