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
  console.log(window.location.pathname);
  
  const [ActiveProfile,setProfile] = useState(false)
  const [ActiveChat,setChat] = useState(true)
  const [ActiveSetting,setSetting] = useState(false)
  return (
    <div className="navbar">
      <div onClick={()=>{
        if(window.location.pathname === '/profile' ) {
          setProfile(true)
          setChat(false)
          setSetting(false)
        }
      }} className={ActiveProfile ? 'active': 'menu'}>
        <UserOutlined />
        <NavLink to={"/profile"} >profile</NavLink>
      </div>
      <div onClick={()=>{
        if(window.location.pathname === '/chat' ) {
          setProfile(false)
          setChat(true)
          setSetting(false)
        }
      }} className={ActiveChat ? 'active' : 'menu'}>
        <WechatOutlined />
        <NavLink to={"/chat"}>chat</NavLink>
      </div>
      <div onClick={()=>{
        if(window.location.pathname === '/setting' ) {
          setProfile(false)
          setChat(false)
          setSetting(true)
        }
      }}   className={ActiveSetting ? 'active': 'menu'}>
        <SettingOutlined />
        <NavLink to={"/setting"}>setting</NavLink>
      </div>
    </div>
  );
};
