import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  WechatOutlined,
  SendOutlined,
} from "@ant-design/icons";
import "./ChatLayout.css";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { Layout, Menu, Button, theme, Space } from "antd";
import { MessageWindow, ChatMessageType } from "./Messages";
import { NavLink, Routes, Route } from "react-router-dom";
import { Profile } from "../profile/Profile";
import { Setting } from "../profile/Settig";
import { Login, SignUp } from "../login/LoginPage";
import { Navbar } from "../navbar/Navbar";

const { Header, Sider, Content } = Layout;
export const LayoutApp: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let [messages, setMessages] = useState<ChatMessageType[]>([]);
  let [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");

  useEffect(() => {
    wsChanel.addEventListener("message", (e: MessageEvent) => {
      //добавляем слушатель на соббытие мessage
      setMessages((pervMessage) => [...pervMessage, ...JSON.parse(e.data)]);
    });
  }, []); // при
  useEffect(() => {
    wsChanel.addEventListener("open", () => {
      //добавляем
      setReadyStatus("ready");
    });
  }, []);

  let [message, setMessage] = useState("");
  const wsChanel: WebSocket = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (message !== "") {
      wsChanel.send(message.trim());
      setMessage("");
    }
  };

  return (
    <Layout className="Layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <NavLink to={"/profile"}>profile</NavLink>,
            },
            {
              key: "2",
              icon: <WechatOutlined />,
              label: <NavLink to={"/chat"}>chat</NavLink>,
            },
            {
              key: "3",
              icon: <SettingOutlined />,
              label: <NavLink to={"/setting"}>setting</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            style={{
              float: "right",
              margin: "15px ",
            }}
          >
            <NavLink to={"/login_page"}>log Out</NavLink>
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/chat"
              element={
                <div className="chat_block">
                  <div className="chat_container">
                    <MessageWindow
                      message={message}
                      messages={messages}
                      setMessage={setMessage}
                      wsChanel={wsChanel}
                    />
                    <div className="input_block">
                      <input
                        onKeyPress={onKeyPressHandler}
                        onChange={(e) => setMessage(e.currentTarget.value)}
                        value={message}
                        placeholder="написать сообщение"
                        name=""
                        id="1"
                        className="form-text"
                      ></input>
                      <Button
                        disabled={readyStatus === "pending"}
                        onClick={sendMessage}
                        type="primary"
                      >
                        send
                        <SendOutlined />
                      </Button>
                    </div>
                  </div>
                  <div className="chat_info">
                    <h1>Chat info</h1>
                  </div>
                </div>
              }
            />
            <Route
              path="/"
              element={
                <MessageWindow
                  message={message}
                  messages={messages}
                  setMessage={setMessage}
                  wsChanel={wsChanel}
                />
              }
            />
            <Route path="/setting" element={<Setting />} />
            <Route path="/login_page" element={<Login isAuth={() => ""} />} />
            <Route path="/sign_up" element={<SignUp />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export const ChatLayout: React.FC = () => {
  let [messages, setMessages] = useState<ChatMessageType[]>([]); //массив с получеными сообщениями
  let [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");
  let [message, setMessage] = useState("");

  useEffect(() => {
    wsChanel.addEventListener("message", (e: MessageEvent) => {
      //добавляем слушатель на соббытие мessage
      setMessages((pervMessage) => [...pervMessage, ...JSON.parse(e.data)]);
    });
  }, []); // при первой отрисовки загружаем все сообщения
  useEffect(() => {
    wsChanel.addEventListener("open", () => {
      //когда канал откроется отменим состояние для дизебла кнопки
      setReadyStatus("ready");
    });
  }, []);

  const wsChanel: WebSocket = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (message !== "") {
      wsChanel.send(message.trim());
      setMessage("");
    }
  };
  return (
    <div className="chat">

      <div className="chat_messages">
        <MessageWindow
          message={message}
          messages={messages}
          setMessage={setMessage}
          wsChanel={wsChanel}
        />
        <div className="send_message">
          <input
            onKeyPress={onKeyPressHandler}
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}
            placeholder="написать сообщение"
            name=""
            id="1"
            className="form-text"
          ></input>
          <Button
            disabled={readyStatus === "pending"}
            onClick={sendMessage}
            type="primary"
          >
            send
            <SendOutlined />
          </Button>
        </div>
      </div>
      <div className="chat_info">
        <h1>Chat info</h1>
      </div>
    </div>
  );
};
