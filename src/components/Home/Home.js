import React, { useEffect, useState } from 'react'
import "./Home.css";
// import Card from './Card/Card';
import homeImg from "../img/home.jpg";
import { CreatePost } from '../CreatePost/CreatePost';
// import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
    const [postList, setPostList] = useState([]);  //配列をuseStateに格納する際の引数、setPostListに格納した後に一つずつ取り出す方法(map関数？)

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

        <div className="cardWrapper">
            {postList.map((post) => {
                return (
                    <a className='cardContainer' href={post.URL} target='_blank'>
                        {/* <a href='{post.URL}'> */}
                        <article className="card">
                            <div className='cardHeader'>
                                {/* <img src='src/components/img/home.jpg'></img> */}
                                <h2 className='cardTitle'>{post.memo}</h2>
                            </div>
                            <button className='tagButton'>#{post.tag}</button>
                        </article>
                        {/* </a> */}
                    </a>
                )
            })}
        </div>
        <div className='footer'>
            <small>&copy;Ito 2023</small>
        </div>
    </>
  )
}

export default Home