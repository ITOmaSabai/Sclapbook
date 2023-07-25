//記事のURLや情報を入力する画面を実装する
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";


export const CreatePost = () => {
  const [URL, setURL] = useState();
  const [tag, setTag] = useState();
  const [memo, setMemo] = useState();


  const createPost = async () => {

    // Add a new document in collection "articles"
    await setDoc(doc(db, "articles"), {
      URL: URL,
      tag: tag,
      memo: memo
    });

    const PostURL = () => {
    };

    return (
      <div className="wrapper">
        <div>
          <p>URL</p>
          <input type="text" placeholder="URLを貼り付け" onChange={(e) => setURL(e.target.value)}></input>
        </div>
        <div>
          <p>タグを選択</p>
          <button className="react" onClick={(e) => setTag("React")}>React</button>
        </div>
        <div>
          <textarea name="" id="" cols="30" rows="10" placeholder="メモを追加" onChange={(e) => setMemo(e.target.value)}></textarea>
        </div>
        <button type="submit" onClick={PostURL}>記事を追加する</button>
      </div>

    );
  };
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