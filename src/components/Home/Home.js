import React from 'react'
import "./Home.css";
// import Card from './Card/Card';
import homeImg from "../img/home.jpg";

const Home = () => {
  return (
    <>
        <div className="topContainer">
            <img src={homeImg} alt="home" />
            <div className="topLogo">
                <h1>Sclapbook</h1>
                <h3>スクラップブック</h3>
            </div>
        </div>  

        <div className="cardWrapper">
            <div className='cardContainer'>
                <article className="card">
                    <div className='cardHeader'>
                        <img src='src/components/img/home.jpg'></img>
                        <h2 className='cardTitle'>React開発の学習方法。初学者が躓きやすい点を徹底解説</h2>
                    </div>
                    <button>#React</button>
                </article>
            </div>

            <div className='cardContainer'>
                <article className="card">
                    <div className='cardHeader'>
                        <img src='src/components/img/home.jpg'></img>
                        <h2 className='cardTitle'>React開発の学習方法。初学者が躓きやすい点を徹底解説</h2>
                    </div>
                    <button>#React</button>
                </article>
            </div>
        </div>

    </>
  )
}

export default Home