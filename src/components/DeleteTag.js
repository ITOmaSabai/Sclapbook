import React, { useEffect } from 'react'

const DeleteTag = ({tag, setTag}) => {
  useEffect(() => {

    const targetTags = document.getElementsByClassName("tagButton")
    console.log(targetTags)
    // const targetTag = {...targetTags}
    // //クリックした際に、クリックしたタグ以外のタグをtagにsetする
    // document.addEventListener("click", (e) => {
    //   setTag(targetTag.filter((t) => t.id !== e.target.id))
    // })
  })

  
  // return (
  //   <div>DeleteTag</div>
  // )
}

export default DeleteTag