import React from "react";
import "./Navbar.css";
import { signInWithPopup } from "firebase/auth";

export const Navbar = () => {
    return (
        <nav className="navContainer" href="#">
            <a className="navHeaderLogo">
                <p>Sclapbook</p>
                <img url=""/>
            </a>
            <div className="navTagContainer">
                <a className="navTag" href="#">
                    <p>すべての記事</p>
                </a>
                <a className="navTag" href="#">
                    <p>タグから探す</p>
                </a>
            </div>
            <div className="loginLinks">
                <button className="login" href="#" onClick={signInWithPopup}>ログイン</button>
                <a href="#" className="signIn">新規登録</a>
            </div>
        </nav>
    );
};

// export default Navbar;

//export default Navbar;では動かない。