import React from "react";
import "./Navbar.css";
import Login from "../Login/Login";


export const Navbar = () => {
    return (
        <nav className="navContainer">
            <div className="navHeaderLogo">
                <a href="#">
                    <p>Sclapbook</p>
                    {/* <img url=""/> */}
                </a>
            </div>
            <div className="navTagContainer">
                <a className="navTag" href="#">
                    <p>すべての記事</p>
                </a>
                <a className="navTag" href="#">
                    <p>タグから探す</p>
                </a>
            </div>
            <div className="loginLinks">
                <button className="login" href="#" onClick={Login}>ログイン</button>
                <a href="#" className="signIn">新規登録</a>
            </div>
        </nav>
    );
};

// export default Navbar;

//export default Navbar;では動かない。