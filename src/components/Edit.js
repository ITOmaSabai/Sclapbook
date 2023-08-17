import React, { useState } from 'react'
// import { setURL, setTag, setMemo } from './CreatePost/CreatePost';
// import {CreatePost} from './CreatePost/CreatePost';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const Edit = async () => {
    const editPost = doc(db, "sclapbook");
    // Set the "capital" field of the city 'DC'
    await updateDoc(editPost, {
        // URL: URL,
        // tag: tag,
        // memo: memo,
        // capital: true
    });

    // const docRef = doc(db, "cities", "SF");
    // const docSnap = await getDoc(docRef);

    return (
        <div className="postWrapper">
            <div className="postContainer">
                <div className="Container">
                    <p>URL</p>
                    <input
                        id="urlValue"
                        type="text"
                        value="{}"
                        placeholder="URLを貼り付け"
                        // onChange={(e) => setURL(e.target.value)}
                    >
                    </input>
                </div>
                <div className="Container tagContainer">
                    <p>タグを選択</p>
                    <button className="react" 
                        // onClick={() => setTag("React")}
                    >
                    React
                    </button>
                    {/* <button className="react" onClick={() => addTag("非同期処理")}>非同期処理</button>
                    <button className="react" onClick={() => addTag("ルーティング")}>ルーティング</button>
                    <button className="react" onClick={() => addTag("onClick")}>onClick</button> */}
                </div>
                <div className="Container">
                    <textarea
                        id="memoValue"
                        name=""
                        cols="50"
                        rows="8"
                        placeholder="メモを追加"
                        // onChange={(e) => setMemo(e.target.value)}
                    >
                    </textarea>
                </div>
                <button type="submit" >記事を追加する</button>
            </div>
        </div>
    )
}

export default Edit