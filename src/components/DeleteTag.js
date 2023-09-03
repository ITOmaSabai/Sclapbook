
const DeleteTag = ({tag, setTag}, e) => {
  // useEffect(() => {

    const targetTags = document.getElementsByClassName("tagButton")
    const targetTag = [...targetTags]
    // console.log(targetTag)

    // //クリックした際に、クリックしたタグ以外のタグをtagにsetする
    document.addEventListener("click", (e) => {
      console.log(e.target.innerText)
      setTag(targetTag.filter((t) => t.innerText !== e.target.innerText))
      // console.log(tag)
    })
  // })

  
  // return (
  //   <div>DeleteTag</div>
  // )
}

export default DeleteTag