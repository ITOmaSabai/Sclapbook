import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { CreatePost } from './components/CreatePost/CreatePost';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useContext, createContext } from 'react';
import Home from './components/Home/Home';
import Edit from './components/Edit';
import About from './components/About';
// import DeleteTag from './components/DeleteTag';
export const MyContext = createContext();

function App() {
  const loginStatus = localStorage.getItem("isAuth");
  const [isAuth, setIsAuth] = useState(loginStatus);
  const [tag, setTag] = useState([]);

  // setIsAuth(loginStatus);

  return (
    <>
      <Router>
        <MyContext.Provider value={[ tag, setTag ]}>
          <Navbar isAuth={ isAuth } setIsAuth={ setIsAuth }/>
          {/* <DeleteTag /> */}
          <Routes>
            <Route path="/" element={<Home isAuth={ isAuth } Edit={Edit} />} ></Route>
            <Route path="/createpost" element={<CreatePost />}></Route>
            <Route path="/edit" element={<Edit />}></Route>
            <Route path='/about' element={<About isAuth={ isAuth } setIsAuth={ setIsAuth }/> }></Route>
            {/* <Route path="/searchbytag" element={<SearchByTag />} ></Route> */}
          </Routes>
          </MyContext.Provider>
      </Router>
    </>
  );
}

export default App;
