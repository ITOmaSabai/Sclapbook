//記事のURLや情報を入力する画面を実装する
// import { doc, setDoc } from "firebase/firestore";
import { useState, useContext } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./CreatePost.css";
import CreateTag from "../CreateTag";
import { MyContext } from "../../App";

export const CreatePost = () => {
  const [URL, setURL] = useState();
  const [memo, setMemo] = useState();
  //useContextを用いてstateを管理
  const [tag, setTag] = useContext(MyContext);
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
      // tagBtn.remove();
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

  //クリックしたタグをuseStateから削除する機能
  // const deleteTag = ({tag, setTag}) => {
  //   const targetTag = document.getElementsByClassName("tagButton")
  //   document.addEventListener("click", (e) => {
  //     setTag(tag.filter((t) => t.id !== e.target.id))
  //   })
  // }
  const handleSubmit = (e) => e.preventDefault();

  const handleInputTagChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTagButtonClick = () => {
    const newTag = inputValue;
    setTag([...tag, newTag]) //https://qiita.com/itachi/items/4184b2afc35b55b45568
    console.log(tag);

    // return (
    //   <ul className='tagList'>
    //     {tag.map((_tag) => 
    //         <li key={_tag.id}>
    //             <input value={_tag.value} />
    //         </li>
    //     )}
    //   </ul>
    // )
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
          <p>タグを追加する</p>
          <form onSubmit={(e) => handleSubmit(e)}>
          {/* <form onSubmit={(e) => handleAddTagButtonClick}> */}
            <input 
              id="inputTag" 
              className="inputTag" 
              placeholder="タグを入力"
              onChange={(e) => handleInputTagChange(e)} />
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
                {_tag}
              </li>
            )}
          </ul>

          {/* <DeleteTag tag={tag} setTag={setTag} /> */}
          
          <div id="listTag">
            {/* <button className="react">React</button> */}
          </div>
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