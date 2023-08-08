import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { CreatePost } from './components/CreatePost/CreatePost';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import { useState } from 'react';

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
