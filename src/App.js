import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { CreatePost } from './components/CreatePost/CreatePost';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import { useState } from 'react';

function App() {
const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <Navbar setIsAuth={ setIsAuth }/> {/* */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
