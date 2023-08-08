import React from 'react'
import Home from '../Home/Home';
import { getAuth, signOut } from "firebase/auth";


const Logout = ({setIsAuth}) => {
    const auth = getAuth();
    signOut(auth).then(() => {
        window.alert("ログアウトしました");
        setIsAuth(false);
        localStorage.clear();
    })

    return (
        <>
            <h2>ログアウトしました</h2>
            <p>トップページへ戻る</p>
            {/* {setIsAuth(false)} */}
            {/* {Home} */}
        </>
    )
}

export default Logout