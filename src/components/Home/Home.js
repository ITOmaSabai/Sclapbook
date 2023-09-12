import React, { useEffect, useState } from 'react'
import "./Home.css";
import homePic from "../img/5949650_3081783.jpg";
import { db, auth } from '../firebase';
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";

const Home = ({isAuth, Edit}) => {
    const [postList, setPostList] = useState([]);

    //ページをリロードした際に１度だけ表示するためuseEffectを使用する
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(collection(db, "sclapbook"));
            //{}で囲んで中身を展開する（スプレッド構文）。data関数を用いて深い階層の中身を取得する。
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getPosts();
    }, []);

    //削除ボタンを押下した際に記事を削除する機能を追加
    const deletePost = async (id) => {
        //クリックした記事のidを指定して削除する(Firebaseの関数)
        await deleteDoc(doc(db, "sclapbook", id));
        window.alert("削除しました");
        window.location.href = "/";
    }

    return (
    <>
        {/* 固定のロゴ部分 */}
        <div className='topWrapper'>
            <div className="topContainer">
                <img src={homePic} alt="home" />
                <div className="topLogo">
                    <h1>Sclapbook</h1>
                    <h3>お気に入りの記事、<br></br>手軽にスクラップ</h3>
                </div>
            </div>
        </div>

        {/* ログアウト時には記事を表示しない */}
        {isAuth ? (
            <div className="cardWrapper">
            {postList.map((post, authId) => {
                // ログイン中のユーザーのidと、記事のidが一致すれば記事を表示する
                if (auth.currentUser.uid === post.author.id) {
                    return (
                        <div className='cardContainer' key={post.id}>
                            <article className="card">
                                <a className='cardHeader' href={post.URL} target='_blank'>
                                    <h2 className='cardTitle'>
                                        memo:
                                        <span>{post.memo}</span>
                                    </h2>
                                </a>
                                <div className='tagButtonContainer'>
                                    <div className='tagCntainer'>
                                        <ul className='tagList'>
                                            {/* ポストにtagが存在していれば、tagをひとつずつ表示する */}
                                             {post.tag && Object.values(post.tag).map((_tag) => 
                                                <li>#{_tag}</li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className='editDeleteContainer'>
                                        <button className='editPostButton'>編集</button>
                                        <button className='deletePostButton' onClick={() => deletePost(post.id)} >削除</button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )
                }
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