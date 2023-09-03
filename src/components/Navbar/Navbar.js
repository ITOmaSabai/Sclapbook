import React from "react";
import "./Navbar.css";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ isAuth, setIsAuth }) => {
    const navigate = useNavigate();
    return (
        <nav className="navContainer">
            <div className="navHeaderLogo">
                <a href="/">
                    <h1>Sclapbook</h1>
                </a>
            </div>
            <div className="navTagContainer">
                <a className="navTag" href="/">
                    <p>すべての記事</p>
                </a>
                <a className="navTag" href="/searchbytag">
                    <p>タグから探す</p>
                </a>
            </div>
            {!isAuth ? (
                <div className="loginLinks">
                    <button className="login" onClick={() => {Login({isAuth, setIsAuth})}}>ログイン</button>
                    <a className="signIn" onClick={() => {Login({isAuth, setIsAuth})}}>新規登録</a>
                </div>
            ) : (
                <div className="loginLinks">
                    <button className="login" onClick={() => {navigate("/createpost")}}>記事を投稿</button>
                    <a className="logout navTag" onClick={() => {Logout({setIsAuth})}}>ログアウト</a>
                </div>
            )}
        </nav>
    );
};

// export default Navbar;

//export default Navbar;では動かない。