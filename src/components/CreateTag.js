import React from 'react'
import { CreatePost } from './CreatePost/CreatePost'
import DeleteTag from './DeleteTag'

const CreateTag = () => {
    //inputの値をgetElementsByClassNameで取得する場合
    // const createdTag = document.getElementsByClassName("inputTag") //HTMLCollectionを取得
    // const arryTag = [...createdTag] //HTMLCollectionを配列に変換(参考: https://twotone.me/web/5087/)

    // const tagBtn = document.createElement("button")
    // arryTag.forEach((elm) => {
    //     if(elm.value) {
    //         tagBtn.innerText = "#" + `${elm.value}`
    //     }
    // })

    const $createdTag = document.getElementById("inputTag")
    const tagBtn = document.createElement("button")

    if($createdTag.value) {
        tagBtn.innerText = "#" + `${$createdTag.value}`
    }

    const tagContainerElement = document.getElementById("listTag")
    if(tagBtn.innerText) {
        tagContainerElement.appendChild(tagBtn)
    }
    $createdTag.value = ""
    tagBtn.classList.add("tagButton")
    //クリックでタグを削除する機能を追加
    tagBtn.onclick = (e) => {
        DeleteTag(e)
    }

    return tagBtn.innerText
}

export default CreateTag