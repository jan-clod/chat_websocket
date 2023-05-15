import { NavLink } from "react-router-dom";
import "./Header.css";
import { Button, Space } from 'antd';

export const Header = () => {

    return(
        <div className="header">
           <h2>Chat</h2>
           <Button type="text"><NavLink to='/login_page'>sign out</NavLink> </Button>

        </div>
    )
}