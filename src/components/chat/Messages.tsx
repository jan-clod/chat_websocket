import  {  useEffect, useRef } from "react";
import "./ChatLayout.css";
import { TfiArrowCircleDown } from "react-icons/tfi";

export type ChatMessageType = {
 message: string;
 photo: string;
 userId: number;
 userName: string;
};
export type propsType = {
  message: string;
  messages: ChatMessageType[];
  setMessage: (message: string) => void;
  wsChanel: WebSocket | null;
};

function MessageWindow({messages, ...props }: propsType) {
console.log('qwe');

  const messagesAnchorRef: any = useRef<HTMLDivElement>(null);
  useEffect(() => {setTimeout(() => click(), 1000)}, [props]);
  const click = () => {
    messagesAnchorRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="messages">
      {messages.map((el, key) => {
        return (
          <div key={key} className="singleMessage">
            <div className="userPhoto">
              <img src={el.photo} alt="" />
            </div>
            <div className="message_body">
              <h3>{el.userName}</h3>
              <p>{el.message}</p>
            </div>
          </div>
        );
      })}
      <div className="↓" onClick={click}>
        <TfiArrowCircleDown />
      </div>
      <div className="anchor" ref={messagesAnchorRef}></div>
    </div>
  );
}

export default MessageWindow;