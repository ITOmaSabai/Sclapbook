# Sclapbook開発してみた
自分はメモ魔？なのか分からないが、開発していて、同じ内容を調べ直すことがあった。  
ブラウザにブックマークをしたとしても、サイトのタイトルだけでは当時自分が検索してそのサイトをヒットさせた時のワード（つまりは当時の困りごと）や、その記事のどの記述に助けられたのか、などが思い出せない。  
また、大量のタブを開きっぱなしにしておく人間である自分は、ブラウザが重くなりがちのため、「使える！」と思ったサイトはその場でサクッと保存してタブをすぐに閉じる、といった運用がしたかった。  
そこで直感的かつ手軽に操作でき、しかもブックマークしたサイトの内容が一目でわかる、というサイトを開発したいと考えた。  
その際、役に立った良質な記事のみを保存しておくさまが、新聞記事の切り抜きを保管しておく「スクラップブックみたいだ」と感じた。  
そうして、"scrap"()と「clap=拍手(したくなるようないい記事)」とをかけて、アプリ名を**Sclapbook**と命名した。  

余談だが、自分は読書をした際にも気に入った文をコピーアンドペーストして、本の内容を要約したりしているので、ゆくゆくは読書ログとしても発展させたいと思う。

## 実装したい機能をざっくりと書き出す
urlを貼り付ける画面→サムネ、記事プレビュー、リンクを自動作成  
↓  
記事をスクラップしました！  
↓  
トップページ  
サムネで数記事を表示しておく  
タグ付ける機能→当時検索したワードを記録しておき、見直す際にソートできるようにする

## 完成形に対するイメージ
何だこれ　検索　調べる　いい記事　わかりやすい　助かった　見返す　タグつけ　ブックマークしておくけどしおりじゃない　スクラップブック

## 実装方法がわからない機能

タグの実装
データを保存する際のawait以降→useState
export default と　export const の違い
→ import ***　と　import { *** }　の違いがある


## 開発ログ

### 7/28
CreatePost画面の表示
URL,memoをonChangeでなくgetElementByIdで取得→useStateで状態保存のロジック作成
headerLogo(Sclapbook)のCSS当て　→　【要修正】aタグとの範囲にズレあり。縦方向の中心に並んでいない。

### 7/29
useStateで正しく保存されないエラー
（Uncaught TypeError: Cannot read properties of null (reading 'value')
    at createPost ）
CreatePost css
navTag headerLogo css
createPostメソッドの構築　→ 以下エラーの対応中
Function addDoc() called with invalid data. Unsupported field value: undefined (found in field tag in document sclapbook/2DVayUyVhyK9eh41FboS)
FirebaseError: Function addDoc() called with invalid data. Unsupported field value: undefined (found in field tag in document sclapbook/2DVayUyVhyK9eh41FboS)

**修正前コード**
```javascript
  const setPost = () => {
    const postedURL = document.getElementById("urlValue");
    const postedMemo = document.getElementById("memoValue");
    setURL(postedURL.value);
    setMemo(postedMemo.value);
    console.log(URL);
    console.log(memo);
    // createPost();
  };
```
**修正後コード**

**解決のヒント**
console.logで確認したところ、一回ボタンを押下した際にundefinedの値が
出力された。
しかし２回目のボタンを押下すると正しい値（入力した値）が出力された。
値を書き換えた際も、2回目のボタン押下から書き換え後の値が出力された。
このことから、何らかの理由でuseStateに保持された値がボタン押下1回分遅れてる？と予想した。

*次のヒント*  
URLを空欄、memoを入力し出力したところ、undefinedと入力値が一つずつ出力された。
このことから、ブランク入力した値がundefinedとなっている？と予想。
そこで、setTagをコメントアウトしてURLとmemoのみ保存したところ、問題なくfirebaseに保存された。

### 7/30
useStateに保存した内容をfirebaseに格納するエラー解消
Figmaでの投稿完了ページデザイン
ルーティング設定
Home画面の制作（保存した投稿の表示）
  → useEffect, map関数, {}&data関数を用いての配列展開
→取得されたデータが一文字ずつに分割される不具合あり

### 7/31
投稿をHomeに表示
Navbarを固定

### 8/1
Homeのcss調整
Loginコンポーネント作成
ログイン機能の追加  
Firebase: No Firebase App '[DEFAULT]' has been created - call initializeApp() first (app/no-app).  
ログインpopup起動時エラー：popup.ts:50 Cross-Origin-Opener-Policy policy would block the window.close call.

### 8/2
ログイン時エラー解決できず
→代わりにログイン機能の実装方法を動画で復習

### 8/3
App.jsで定義したuseStateを、App.jsからルーティングしているNavbar.jsでインポートしているLogin.jsで呼び出したい。
方法がわからない。

### 8/4
Navbarの引数としてsetIsAuthを受け取り、onClick内のLoginの引数として渡す。

### 8/5
コンポーネントとpropsの渡し方

#### Navbarコンポーネントの引数のpropsオブジェクトに、setIsAuthという値が入ったsetIsAuthプロパティを渡している
```javascript
function App() {
const [isAuth, setIsAuth] = useState(false);
  return (
    <>
      <Navbar setIsAuth={ setIsAuth }/>  
    </>
  );
}
```

#### Navbarコンポーネントにて引数としてsetIsAuthを受け取り、Loginコンポーネントの引数としてsetIsAuthを渡している(つもり)
```javascript
export const Navbar = ({ setIsAuth }) => {
  return (
    <div className="loginLinks">
      <button className="login" href="#" onClick={() => {Login({setIsAuth})}}>ログイン</button>
      <a href="#" className="signIn">新規登録</a>
    </div>
  );
};
```
#### Loginコンポーネントの引数として受け取ったsetIsAuthを状態変数として格納する
```javascript
const Login = async ({ setIsAuth }) => {
  await signInWithPopup(auth, provider)
  .then((result) => {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
  });
}
```
propsとして渡せるのは、値のみでなく関数も渡せる?
onClick時の動作をCreatePostコンポーネントの実行→CreatePostへのルーティングへ変更しようと試みた。
参照：
しかし以下エラーが発生。
```
useNavigate() may be used only in the context of a <Router> component.
```
調べると、　とのことなので、App.jsの記述を変更してみた。

**変更前**
```javascript
function App() {
const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <Navbar isAuth={ isAuth } setIsAuth={ setIsAuth }/> {/* */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </>
  );
}
```
**変更後**
```javascript
function App() {
const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <Router>
        <Navbar isAuth={ isAuth } setIsAuth={ setIsAuth }/> {/* */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </>
  );
}
```
<Router>コンポーネント内にNavbarを配置することで、Routerで囲む形となり、無事動作した。

#### 次なる課題
タグを増やしたが、最後に選択したタグのみが保存されてしまった。→配列で取得できるように修正中
スプレッド構文を使用すると実現可能と聞き、  `const addTag = setTag([...tag]);`  と定義
無限ループ？エラー発生
  **Too many re-renders. React limits the number of renders to prevent an infinite loop.**  
スプレッド構文の使用方法が誤っているようだ。

### 8/7
ログイン状態を各ページに反映させる
→localStorageに保存したisAuthをfalseに書き換えても、リロードするとNavbarにスクラップボタンが表示されてしまう。
（=ログイン状態がtrueになっている）
<!-- 三項演算子の用法が誤っていると推測。 -->
不明点
* Logoutで非同期処理が必要か？（ログアウトできていない）  
→8/8解決。非同期処理は不要。*thenメソッドがあってもasync/awaitは不要*。
* コンポーネントへの引数の渡し方

### 8/8
下記の通り変更したところ、ログアウト時のNavbarにはスクラップボタンでなくログインボタンが表示されるようになった。
```javascript
localStorage.setItem("isAuth", false);
```
↓
```javascript
localStorage.clear();
```

### 課題
ログインしていない状態にもかかわらず、Homeの記事が表示されるエラー  
→渡ってきている情報を出力したところ、謎の{}データだった  
→引数としてHomeで受け取る際に、{}をつけ忘れていたので{isAuth}に修正  
→今度はisAuthを出力するとundefinedとなり、ログインしても記事が表示されなくなった  
* 修正前コード
```javascript
function App() {
  const loginStatus = localStorage.getItem("isAuth");
  console.log(loginStatus);
  const [isAuth, setIsAuth] = useState(loginStatus);
  // setIsAuth(loginStatus);
  return (
    <>
      <Router>
        <Navbar isAuth={ isAuth } setIsAuth={ setIsAuth }/>
        <Routes>
          <Route path="/" element={<Home />} isAuth={ isAuth }></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
```
* 修正後コード  
```javascript
function App() {
  const loginStatus = localStorage.getItem("isAuth");
  console.log(loginStatus);
  const [isAuth, setIsAuth] = useState(loginStatus);
  // setIsAuth(loginStatus);
  return (
    <>
      <Router>
        <Navbar isAuth={ isAuth } setIsAuth={ setIsAuth }/>
        <Routes>
          <Route path="/" element={<Home isAuth={ isAuth } />} ></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
```

### 8/9
ログイン後、ブラウザでログアウトしてからHomeで更新すると、ログイン状態をキープしてしまう
記事削除機能を実装

編集ボタンをクリック→クリックした記事のURL,tag,memoを取得(getPost(e))
→編集→保存ボタンをクリックすると上書き保存

set関数3兄弟がEditでインポートできない不具合が発生

### 疑問点
```javascript
<button onClick={<Edit />}></button>
```  
と  
```javascript
<button onClick={() => {Edit()}}></button>
```  
の違い  
  

#### exportに関するエラー発生　　
> Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: /Users/john/Desktop/dev/react-practice/practice0722/src/components/CreatePost/CreatePost.js: Export 'setURL' is not defined. (72:10)  
  70 | };  
  71 |  
> 72 | export  { setURL }

##### export元
```javascript
export  { setURL }
```
##### 調査結果

> 重複した名前でエクスポートを実施したり、 default のエクスポートを複数使用すると SyntaxError が発生し、モジュールが評価されなくなります。

以下の通りimport？していた
```javascript
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { CreatePost } from './components/CreatePost/CreatePost';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home/Home';
import Edit from './components/Edit';

function App() {
  const loginStatus = localStorage.getItem("isAuth");
  console.log(loginStatus);
  const [isAuth, setIsAuth] = useState(loginStatus);
  // setIsAuth(loginStatus);
  return (
    <>
      <Router>
        <Navbar isAuth={ isAuth } setIsAuth={ setIsAuth }/>
        <Routes>
          <Route path="/" element={<Home isAuth={ isAuth } Edit={Edit} />} ></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
          <Route path="/edit" element={<Edit  setURL={setURL} setTag={setTag} setMemo={setMemo} />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
```  
と思ったけど関係なかった。エラー解消ならず。

### 8/10
setURL他を使用するのをやめて、新たに状態変数を保存する関数をEdit内で定義することにする。
また、記事の編集方法をFirebaseドキュメントで調べる。
Invalid document reference. Document references must have an even number of segments, but sclapbook has 1.

### 8/11  
Invalid document reference. Document references must have an even number of segments, but sclapbook has 1.
エラー継続対応。とりあえず後回し。

### 8/12
タグ生成機能追加。
以下コードではエラー発生
```javascript
 const createTag = () => {
    const input = document.querySelector("inputTag")
    console.log(input.value)
    // const p = document.createElement("p")
    // p.innerText = input.value
  }
  ```

> Cannot read properties of null (reading 'value')
TypeError: Cannot read properties of null (reading 'value')


*修正後コード*
```javascript
  const createTag = () => {
    const input = document.querySelectorAll("inputTag")
    console.log(input.value)
    const p = document.createElement("p")
    p.innerText = input.value
    document.body.appendChild(p)
  }
  ```

### 8/13
> TypeError: tagContainerElement.appendChild is not a function
の修正
参考URL:https://bobbyhadz.com/blog/javascript-typeerror-appendchild-is-not-a-function

修正前コード
```javascript
const createTag = () => {
    const tagContainerElement = document.getElementsByClassName("listTag")
    const input = document.querySelectorAll("inputTag")
    console.log(input.value)
    const p = document.createElement("p")
    p.innerText = input.value
    console.log(p)
    tagContainerElement.appendChild(p)
  }
```

修正後コード
```javascript
const createTag = () => {
    const tagContainerElement = document.getElementsByClassName("listTag")
    const input = document.querySelectorAll("inputTag")
    console.log(input.value)
    const p = document.createElement("p")
    p.innerText = input.value
    console.log(p)
    tagContainerElement[0].appendChild(p)
  }
```
### 学んだことメモ  
* appendChildはインデックスを指定する
* querySelectorAllが返すのはNodelist。だから.valueの値がundefinedだった。
* getElementsByClassNameが取得するのはHTMLCollection。for文で取り出す必要がある。いきなりforEachは使用できないのでスプレッド構文で格納してから。


### 8/15
createTagの修正

getElementsByClassNameで取得できるのはHTMLCollectionであり、配列ではない。  
配列ではないので、forEachは使えない。

```javascript
const createdTag = document.getElementsByClassName("inputTag")
console.log(createdTag) //出力結果はHTMLCollection [input.inputTag]
for (let i = 0; i < createdTag.length; i++) {
  console.log(createdTag.item(i).value); //出力結果はinputの値
}
```

タグをホームに表示する機能  
タグは配列だったり1つだったりするので、条件分岐させつつ配列を展開してボタンを生成する機能を実装


### 8/16  
tag, setTagのuseStateの初期値を空の配列にすることで、  
タグが一つの場合でも要素数1の配列とすることができた。  
タグが空文字の場合にはタグをstateに保存しない＆生成しない機能を追加。
* 生成されたタグに、クリックすると削除するボタンを設定したい。
* タグを生成後にインプットの値を空にする機能を追加したい。→完了
* 投稿後、createElementしたbuttonを削除したい。  
→リロードした方が早い？
* useStateを他のコンポーネントで使用する方法、もしくはexportしたコンポーネントの中で定義した関数をexportする方法

### 8/17
DeleteTagコンポーネントを用意して、CreateTag内で呼び出し、tag, setTagをpropsとして渡す。 
```Javascript
<DeleteTag tag={tag} setTag={setTag} />
``` 
(参考:http://www.code-magagine.com/?p=13251#google_vignette)
→

### 8/18
useStateを渡すため、CreateTagコンポーネント内でDeleteTagコンポーネントを読んでいるが無限レンダリングが発生しているようだ。  
CreateTagで生成されたタグに対して、onClickでe.target.innerTextを取得して、filter関数で取り除いた配列を  
set関数でstatetして保存したい・・・が、追加ボタンを押した瞬間にonClickが発火しており
空文字が24個取れたり、追加が74個取れたりしている。  
CreateTagで呼び出しているDeleteTagが常に発火しているため、クリックした場所の要素を取得してしまっている。
→**onClickに対するe.targetの知識不足＆レンダリングのタイミングを学び直す必要がある**

### 8/19,20　　
useContextを使用したグローバルな状態管理について学ぶ。

### 8/21　　
useContextを使用してリファクタリング開始  

工事中の機能  
* 投稿時のタグ削除
* タグから検索能力
* 投稿内容の変更機能  

実装したい機能  
* 投稿削除機能 → 済  
* タグをHomeに表示する機能  
* ログインした人の投稿のみ表示する機能  
* Home画面に表示する記事を投稿日順に並べる機能  

### 8/22  
* 記事を削除する機能を追加。deleteDoc関数を使うも、以下エラー再発 自然と解消された。
```javascript
FirebaseError: Invalid document reference. Document references must have an even number of segments, but sclapbook has 1.
```  
* postにid追加  
* 投稿時にuserNameとuserIdを保存するよう修正
* Timestampを取得


  
引数としてpropsを受け取る際に、{}が必要なのか否かで何度も苦しめられた。  
どのブラウザAPIが何の型のデータを返すのか。HTMLCollection, Nodelist etc....  
最初から必要となる機能を洗い出し、定義しておくことでプロダクトがゴチャつかないと感じた

## 日程の再設定 (残り7日間で実装するには)
* Home画面に投稿済み記事表示機能　~8/1
* ログイン機能 8/2
* ログアウト機能 8/2
* 投稿編集機能 8/3
* 投稿削除機能 8/3
* タグ生成機能 8/4
* タグから検索機能 8/5
* キーワードから検索機能(できれば)
* 投稿日時ごとに記事を表示機能
* 空文字での投稿を受け付けない機能(入力エラー検出)
* 「〇〇(ユーザー名)の記事一覧」とHomeに表示する機能
* ログインしているユーザーの投稿した記事のみ表示する機能

## 今後学習したい機能
* CSSアニメーション
* JSアニメーション
* TypeScript
* Tailwind CSS
* MD記法(GitHub投稿のため)
* GitHubでのバージョン管理

## 所管
* 完成形をイメージしないと、後から後から改善点、不具合が出てくる  
→結果、開発の順序がとっ散らかる、一貫性がなくなる。  
また、ゴールまでの道筋を見失ってしまい開発モチベーションが低下する。  
* 完成させてこそ、自走力を見せることができるのではないか？
* エラーチェック、デバッグを完了させてこそ、用心深さや技術力をアピールできるのではないか？
* 技術力は高い方が、採用確率が上がる。しかし完璧な技術力を身につけるのを待っていたら、一生就職できない。  
→独学を始めた自走力や、3ヶ月でここまで作ったという成長率をアピールするか？