import React, { useEffect, useState } from 'react'
import "./Home.css";
import homeImg from "../img/home.jpg";
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import Edit from "../Edit";

const Home = ({isAuth, Edit}) => {
    //配列をuseStateに格納する際の引数、setPostListに格納した後に一つずつ取り出す方法(map関数？)
    const [postList, setPostList] = useState([]);
    // const tag

    //ページをリロードした際に１度だけ表示したいので、useEffectを使用する
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(collection(db, "sclapbook"));
            //{}で囲むと中身を展開できる。スプレッド構文。data関数を用いると深い階層の中身を簡単に取得できる。
            setPostList(data.docs.map((doc) => ({ ...doc.data() })));
        }
        getPosts();
    }, []);

    return (
    <>
        <div className='topWrapper'>
            <div className="topContainer">
                <img src={homeImg} alt="home" />
                <div className="topLogo">
                    <h1>Sclapbook</h1>
                    <h3>スクラップブック</h3>
                </div>
            </div>
        </div>
        {console.log(isAuth)}

        {/* ログアウト時には記事を表示しない */}
        {isAuth ? (
            <div className="cardWrapper">
            {postList.map((post) => {

                //タグを抜き出して一つずつ表示する機能を追加
                const eachTag = post.tag
                console.log(post.tag)
                // const tag = eachTag.forEach((t) => t)

                return (
                    <div className='cardContainer'>
                        <article className="card">
                            <a className='cardHeader' href={post.URL} target='_blank'>
                                <h2 className='cardTitle'>{post.memo}</h2>
                            </a>
                            <button className='tagButton'></button>
                            
                            <button onClick={(e) => {Edit(e.target.value)}}>編集</button>
                        </article>
                    </div>
                )
            })}
        </div>
        ) : (
            <div className="mainWrapper">
                <h1>記事を表示するにはログインしてください</h1>
            </div>
        )}
        
        <div className='footer'>
            <small>&copy;Ito 2023</small>
        </div>
    </>
  )
}

export default Home