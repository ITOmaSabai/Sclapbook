//記事のURLや情報を入力する画面を実装する
// import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./CreatePost.css";
import CreateTag from "../CreateTag";
import DeleteTag from "../DeleteTag";

export const CreatePost = () => {
  const [URL, setURL] = useState();
  const [tag, setTag] = useState([]);
  const [memo, setMemo] = useState();
  
  const setPost = () => {
    createPost();
    console.log(tag);
    window.alert("スクラップしました！")
    //投稿後、useStateを空にする。
    // setURL();
    // setMemo();
    // setTag();
    // console.log(tag);

    //投稿後、input他の値を空にする
    const $inputUrl = document.getElementById("inputUrl")
    $inputUrl.value = ""
    const $inputMemo = document.getElementById("inputMemo")
    $inputMemo.value = ""
  };

  const createPost = async () => {
    await addDoc(collection(db, "sclapbook"), {
      URL: URL,
      tag: tag,
      memo: memo
    });
  };

  //クリックしたタグをuseStateから削除する機能を追加
  const deleteTag = ({tag, setTag}) => {
    const targetTag = document.getElementsByClassName("tagButton")
    document.addEventListener("click", (e) => {
      setTag(tag.filter((t) => t.id !== e.target.id))
    })
  }
  
  
  return (
    <div className="postWrapper">
      <div className="postContainer">
        <div className="Container">
          <p>URL</p>
          <input
            id="inputUrl"
            type="text"
            placeholder="URLを貼り付け"
            onChange={(e) => setURL(e.target.value)}
          >
          </input>
        </div>

        <div className="Container tagContainer">
          <p>タグを追加する（クリックで削除）</p>
          <input id="inputTag" className="inputTag" placeholder="タグを入力"></input>
          <button
            className="addTagButton"
            onClick={() => {
              //DeleteTagコンポーネントを作成して、propsを渡す
              const inputedTag = CreateTag();
              setTag([...tag, inputedTag]) //https://qiita.com/itachi/items/4184b2afc35b55b45568
            }}
          >
            追加
          </button>
          <DeleteTag tag={tag} setTag={setTag} />
          
          <div id="listTag">
            <button className="react">React</button>
            {/* <button className="react" onClick={() => addTag("非同期処理")}>非同期処理</button>
            <button className="react" onClick={() => addTag("ルーティング")}>ルーティング</button>
            <button className="react" onClick={() => addTag("onClick")}>onClick</button> */}
          </div>
          <ul>

          </ul>
        </div>

        <div className="Container">
          <textarea
            id="inputMemo"
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

// export {deleteTag}