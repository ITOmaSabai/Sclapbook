import React, { useState } from 'react'
import { CreatePost } from './CreatePost/CreatePost'
import DeleteTag from './DeleteTag'

const CreateTag = (tag, setTag) => {

    // tagを配列としてstateに格納して、
    // map関数で取り出し、ul下のliに表示する。
    // const [createdTag, setCreatedTag] = useState();
    
    return (
        <ul className='tagList'>
            {tag.map((_tag) => 
                <li key={_tag.id}>
                    <input value={_tag} />
                </li>
            )}
        </ul>
    )


    //HTML要素にアクセスする記述と、button要素を生成する記述
    const $createdTag = document.getElementById("inputTag")
    const tagBtn = document.createElement("button")
    // 生成されたボタン要素のtextを定義
    if($createdTag.value) {
        tagBtn.innerText = "#" + `${$createdTag.value}`
    }
    //生成されたボタンを格納するHTML要素にアクセスし、タグを生成する機能
    const tagContainerElement = document.getElementById("listTag")
    if(tagBtn.innerText) {
        tagContainerElement.appendChild(tagBtn)
    }
    $createdTag.value = ""
    tagBtn.classList.add("tagButton")

    //クリックでタグを削除する機能を追加　何かおかしい
    // tagBtn.onclick = (e) => {
    //     DeleteTag(e)
    // }

    return tagBtn.innerText
}

export default CreateTag