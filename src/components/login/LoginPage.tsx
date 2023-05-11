import "./Login_page.css";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Button, Space } from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { authApi } from "../../api/api";

type responseType = {
  resultCode?: number;
  messages?: [];
  data: {
    id: number;
    email: string;
    login: string;
  };
};
type propsType = {
  isAuth: Dispatch<SetStateAction<boolean>>;
};
let myLogin = {
  email: "Fia.yan@mail.ru",
  password: "310074ZxC",
  rememberMe: true,
};
export const Login: React.FC<propsType> = ({ isAuth, ...props }) => {
  useEffect(() => {
    authApi.me().then((response: responseType) => {
      if (response.resultCode === 0) {isAuth(true);}
    });
  }, []); // при монтировании компонента произайдет проверка на авторизацию и редиректе на чат

  const clickSignIn = () => {
    authApi.login(myLogin.email, myLogin.password, true).then((response) => {
      if (response.data.resultCode == 0) {
        isAuth(true);
        // регистрация/авторизация прошла успешно
      } // если успех редирект в чат
    });
  }
  return (
    <div className="Login_page">
      <div className="login_form">
        <h1>Login</h1>
        <div className="login_form_inputs">
          <p>User Name</p>
          <Input
            className="inputs"
            placeholder="Enter your username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          <p>Password</p>
          <Input.Password
            className="inputs"
            prefix={<LockOutlined />}
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button onClick={clickSignIn} className="buttons" type="primary" block>
            Sign in
          </Button>
        </div>

        <div className="footer_login">
          <p>Вы не зарегестрированы?</p>
          <NavLink to="/sign_up">Sign Up</NavLink>
        </div>
      </div>
    </div>
  );
};
export const SignUp: React.FC = () => {
  return (
    <div className="Login_page">
      <div className="login_form">
        <h1>Registration</h1>
        <div className="login_form_inputs">
          <p>User Name</p>
          <Input
            className="inputs"
            placeholder="Enter your username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="введить свое имя">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          <p>E-mail</p>
          <Input
            className="inputs"
            placeholder="Enter your E-mail"
            prefix={<MailOutlined />}
            suffix={
              <Tooltip title="введите свой e-mail">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          <p>Password</p>
          <Input.Password
            className="inputs"
            prefix={<LockOutlined />}
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <p>Repeat Password</p>
          <Input.Password
            className="inputs"
            prefix={<LockOutlined />}
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button className="buttons" type="primary" block>
            Sign Up
          </Button>
        </div>

        <div className="footer_login">
          <p>Вы уже зарегестрированы?</p>
          <NavLink to="/login_page">Sign In</NavLink>
        </div>
      </div>
    </div>
  );
};
