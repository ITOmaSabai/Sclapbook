//記事のURLや情報を入力する画面を実装する
// import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./CreatePost.css";


export const CreatePost = () => {
  const [URL, setURL] = useState();
  const [tag, setTag] = useState();
  const [memo, setMemo] = useState();

  
  const setPost = () => {
    //onChangeに変更する前のコード
    // const postedURL = document.getElementById("urlValue");
    // const postedMemo = document.getElementById("memoValue");
    // setURL(postedURL.value);
    // setMemo(postedMemo.value);

    // console.log(URL);
    // console.log(memo);
    createPost();
    window.alert("スクラップしました！")
    setURL("");
    setMemo("");
  };

  const createPost = async () => {
    await addDoc(collection(db, "sclapbook"), {
      URL: URL,
      tag: tag,
      memo: memo
    });
  };


  return (
    //onChangeに変更する前のコード
  //   <div className="postWrapper">
  //     <div className="postContainer">
  //       <div className="Container">
  //         <p>URL</p>
  //         <input id="urlValue" type="text" placeholder="URLを貼り付け" ></input>
  //       </div>
  //       <div className="Container tagContainer">
  //         <p>タグを選択</p>
  //         <button className="react" onClick={(e) => setTag("React")}>React</button>
  //       </div>
  //       <div className="Container">
  //         <textarea id="memoValue" name="" cols="50" rows="8" placeholder="メモを追加"></textarea>
  //       </div>
  //       <button type="submit" onClick={setPost}>記事を追加する</button>
  //     </div>
  //   </div>
  // );

  <div className="postWrapper">
    <div className="postContainer">
      <div className="Container">
        <p>URL</p>
        <input
          id="urlValue"
          type="text"
          placeholder="URLを貼り付け"
          onChange={(e) => setURL(e.target.value)}
        >
        </input>
      </div>
      <div className="Container tagContainer">
        <p>タグを選択</p>
        <button className="react" onClick={(e) => setTag("React")}>React</button>
      </div>
      <div className="Container">
        <textarea
          id="memoValue"
          name=""
          cols="50"
          rows="8"
          placeholder="メモを追加"
          onChange={(e) => setMemo(e.target.value)}
        >
        </textarea>
      </div>
      <button type="submit" onClick={setPost}>記事を追加する</button>
    </div>
</div>
);
};

// 以下は投稿を表示するページに実装する
// <div className="cardContainer">
//           <div>
//             <img src="" alt="" className="thumbnail" />
//           </div>
//           <div className="card">
//             <h2>記事タイトル</h2>
//             <p>プレビュープレビュープレビュー</p>
//           </div>
//           <div className="cardInfo">
//             <p>いいね</p>
//             <p>タグ</p>
//           </div>
//         </div>