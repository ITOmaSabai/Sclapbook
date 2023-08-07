import React from 'react'
import Home from '../Home/Home';


const Logout = (isAuth, setIsAuth) => {
    

    return (
        <>
            <h2>ログアウトしました</h2>
            <p>トップページへ戻る</p>
            {setIsAuth(false)}
            {/* {Home} */}
        </>
    )
}

export default Logout