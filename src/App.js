import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './komponen/Login/Login';
import Quiz from './komponen/Quiz/Quiz';


function App() {
  const isLogin = localStorage.getItem('Login');
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLogin ? <Quiz /> : <Login />} />
        <Route path="/Quiz" element={isLogin ? <Quiz /> :  <Login /> }/>
      </Routes>
    </Router>
  );
}

export default App;
