import React from 'react'
import { Link } from 'react-router-dom'
// import "./SearchByTag.css";
import "./SearchByTag.css"

const SearchByTag = () => {
  return (
    <>
        <div className='wrapper'>
            <h2>工事中</h2>
            <Link to={"/"}>トップ画面へ</Link>
        </div>
    </>
  )
}

export default SearchByTag