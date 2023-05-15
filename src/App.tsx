import { useEffect, useState } from "react";
import "./App.css";
import { Login, SignUp } from "./components/login/LoginPage";
import axios from "axios";
import { authApi } from "./api/api";
import { Navigate, Route, Routes, redirect } from "react-router-dom";
import { Profile } from "./components/profile/Profile";
import { Setting } from "./components/profile/Settig";
import { Navbar } from "./components/navbar/Navbar";
import { Header } from "./components/header/Header";
import ChatLayout from "./components/chat/ChatLayout";

function App() {
  let [isAuth, setIsAuth] = useState(true);
  let [registrated, setRegistrated] = useState<"success" | "NoSuccess">(
    "NoSuccess"
  );
  return (
    <div className="App">
      <Header />
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/*" element={<ChatLayout />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/chat" element={<ChatLayout />} /> */}
          <Route path="/setting" element={<Setting />} />
          <Route path="/login_page" element={<Login isAuth={() => ""} />} />
          <Route path="/sign_up" element={<SignUp />} />
        </Routes>
        {/*   {!isAuth && <Navigate replace to="/login_page" />} */}
      </div>
    </div>
  );
}

export default App;
