import React from 'react'
import "./SearchByTag.css"

const SearchByTag = () => {
  return (
    <>
        <div className='wrapper'>
            {/* <h2 className='sectionTitle'>What's "Sclapbook"?</h2> */}
            {/* <h1 className='sectionTitle'>What's "Sclapbook"?</h1> */}
            {/* <br></br> */}
          <div className='aboutDescription'>
            <p>
              役に立ったブログ記事、気になる旅行先のページ、心に響いた風景写真。<br></br>
              毎日たくさんの記事に出会うなかで<br></br>
              私たちは、なぜブックマークしたのかを忘れてしまいがちです。<br></br><br></br>
              <span className="themeColor">Sclapbook（スクラップブック）</span>は、<span className="fontBold">備忘録型ブックマーク作成サービス</span>です。<br></br>
              "clap"（拍手）を送りたくなるような記事を、メモを添えてブックマークすることで<br></br>
              いつでも見返せる、自分だけのスクラップブックを作ることができます。<br></br><br></br>
              "ブックマーク魔"のあなたに、ぜひ使ってほしいサービスです。
            </p>

          </div>
        </div>
    </>
  )
}

export default SearchByTag