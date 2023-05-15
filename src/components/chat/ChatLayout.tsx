import { KeyboardEvent, useEffect, useState } from "react";
import MessageWindow, { ChatMessageType } from "./Messages";
import { AudioOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
function ChatLayout() {
  let [messages, setMessages] = useState<ChatMessageType[]>([]); //массив с получеными сообщениями
  let [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");
  let [myMessage, setMyMessage] = useState("");
  let [wsChanel, setWsChanel] = useState<WebSocket | null>(null); //ws храним в state для того что бы при измении канал была перерисовка
  if (wsChanel !== null) {
    wsChanel.onclose = function() {
      console.log("Error WS.");
   }
  }
  useEffect(() => {
    let ws: WebSocket; // объявляем переменную снаружи
    const closeHadler = () => { 
      alert("CLOSE WS");
      setTimeout(createChanel, 3000); //при закрытии канала пытаемся установить новый канал
    };
    function createChanel() {
      ws?.removeEventListener("close", closeHadler); //ecли сокет уже был закрываем его
      ws?.close();
      ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
      );
      ws?.addEventListener("close", closeHadler);
      setWsChanel(ws);
    }
    createChanel();
    return () => {
      //cleanUp function
      ws?.removeEventListener("close", closeHadler);
      ws?.close();
    };
  }, []);

  useEffect(() => {
    const messageHandler = (e: MessageEvent) => {
      setMessages((pervMessage) => [...pervMessage, ...JSON.parse(e.data)]);
    };
    wsChanel?.addEventListener("message", (e: MessageEvent) => {
      messageHandler(e);
      console.log("send", "message_event");
    }); //добавляем слушатель на соббытие мessage
    return () => {
      //cleanUp function
      wsChanel?.removeEventListener("message", messageHandler);
    };
  }, [wsChanel]); // при изменении канала вешаем слушатель уже на новый ws

  useEffect(() => {
    const openHandler = () => {
      setReadyStatus("ready");
    }; //когда канал откроется отменим состояние для дизебла кнопки
    wsChanel?.addEventListener("open", () => openHandler());
    return () => {
      wsChanel?.removeEventListener("open", openHandler);
    };
  }, [wsChanel]);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (myMessage !== "") {
      wsChanel?.send(myMessage.trim());
      setMyMessage("");
    }
  };
  return (
    <div className="ChatLayout">
      <div className="chat_winodw">
        <MessageWindow
          message={myMessage}
          messages={messages}
          setMessage={setMyMessage}
          wsChanel={wsChanel}
        />
        <div className="send_message">
          <Search
            placeholder="input message"
            enterButton={`Send `}
            size="large"
            suffix={suffix}
            onKeyPress={onKeyPressHandler}
            onChange={(e) => setMyMessage(e.currentTarget.value)}
            value={myMessage}
            name=""
            id="1"
            className="form_inputs"
            onSearch={sendMessage}
            disabled={readyStatus === "pending"}
          />
        </div>
      </div>
      <div className="chat_info">
        <h2>Chat info</h2>
      </div>
    </div>
  );
}
export default ChatLayout;
