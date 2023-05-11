import React, { useEffect, useRef, useState } from "react";
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
  wsChanel: WebSocket;
};

export const MessageWindow = ({ setMessage, ...props }: propsType) => {
  const onWin = (e: any) => {
    window.scrollTo({
      top: 2000,
      behavior: "smooth",
    });
  };
  const messagesAnchorRef: any = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);
  useEffect(() => {
    messagesAnchorRef.current.scrollIntoView({ behavior: "smooth" });
  }, [props]);
  const click = () => {
    messagesAnchorRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="messageBlock">
      {props.messages.map((el, key) => {
        return (
          <div key={key} className="singleMessage">
            <div className="userPhoto">
              <img src={el.photo} alt="" />
            </div>
            <div>
              <h3>{el.userName}</h3>
              <p>{el.message}</p>
            </div>
          </div>
        );
      })}
      <div className="↓" onClick={click}>
        <TfiArrowCircleDown />
      </div>
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};