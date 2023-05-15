import "./Navbar.css";
import { NavLink, Routes, Route } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  WechatOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useState } from "react";
export const Navbar = () => {
  const [ActiveProfile, setProfile] = useState(false);
  const [ActiveChat, setChat] = useState(false);
  const [ActiveSetting, setSetting] = useState(false);
  return (
    <div className="navbar">
      <NavLink className="nav" to={"/profile"}>
        <div
          onClick={() => {
            window.location.pathname = "/profile";
            setProfile(true);
            setChat(false);
            setSetting(false);
          }}
          className={window.location.pathname === "/profile" ? "active" : "menu"}
        >
          <UserOutlined />
          <p>Profile</p>
        </div>
      </NavLink>
      <NavLink className="nav" to={"/"}>
        <div
          onClick={() => {
            window.location.pathname = "/";
            setProfile(false);
            setChat(true);
            setSetting(false);
          }}
          className={window.location.pathname === "/" ? "active" : "menu"}
        >
          <WechatOutlined />
          <p>Chat</p>
        </div>
      </NavLink>
      <NavLink className="nav" to={"/setting"}>
        <div
          onClick={() => {
            window.location.pathname = "/setting";
            setProfile(false);
            setChat(false);
            setSetting(true);
          }}
          className={window.location.pathname === "/setting" ? "active" : "menu"}
        >
          <SettingOutlined />
          <p>Setting</p>
        </div>
      </NavLink>
    </div>
  );
};
