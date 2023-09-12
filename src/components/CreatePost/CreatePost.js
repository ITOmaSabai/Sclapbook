//記事のURLや情報を入力する画面を実装する
import { useState, useContext } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./CreatePost.css";

export const CreatePost = () => {
  const [URL, setURL] = useState();
  const [memo, setMemo] = useState();
  const [tag, setTag] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
  //投稿ボタンを押した際の動作
  const setPost = () => {
    //URLまたはmemoが空の時の処理
    if (!(URL || memo)) {
      window.alert("URLまたはmemoを入力してください")
    } else {
      createPost();
      window.alert("スクラップしました！")
    
      //投稿後、input他の値を空にする
      const $inputUrl = document.getElementById("inputUrl");
      $inputUrl.value = "";
      const $inputTag = document.getElementById("inputTag");
      $inputTag.value = "";
      const $inputMemo = document.getElementById("inputMemo");
      $inputMemo.value = "";

      //投稿後、useStateを空にする。
      setURL("");
      setMemo("");
      setTag([]);
    }
  };

  //投稿をFirebaseに保存する機能
  const createPost = async () => {
    await addDoc(collection(db, "sclapbook"), {
      URL: URL,
      tag: tag,
      memo: memo,
      date: Timestamp.fromDate(new Date()),
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    });
  };

  const handleSubmit = (e) => e.preventDefault();

  const handleInputTagChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTagButtonClick = () => {
    const newTag = inputValue;
    setTag([...tag, newTag])
  }
  
  
  return (
    <div className="postWrapper">
      <div className="postContainer">
        <div className="Container">
          <p>URLを入力</p>
          <input
            id="inputUrl"
            className="inputUrl"
            type="url"
            placeholder="URLを貼り付け"
            onChange={(e) => setURL(e.target.value)}
          >
          </input>
        </div>

        <div className="Container tagContainer">
          <p>タグを追加する</p>
          <form
            className="tagInputForm"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input 
              id="inputTag" 
              className="inputTag" 
              placeholder="タグを入力"
              onChange={(e) => handleInputTagChange(e)}
            />
            <button
              className="addTagButton"
              // autoCompleteをoffにする機能を実装予定
              onClick={handleAddTagButtonClick}
            >
              追加
            </button>
          </form>

          <ul className='tagList'>
            {tag.map((_tag) => 
              <li key={_tag.id}>
                #{_tag}
              </li>
            )}
          </ul>
        </div>

        <div className="Container memoContainer">
          <input
            id="inputMemo"
            className="inputMemo"
            name=""
            placeholder="メモを追加"
            onChange={(e) => setMemo(e.target.value)}
          >
          </input>
        </div>
        <button type="submit" onClick={setPost}>記事を追加する</button>
      </div>
    </div>
  );
};
