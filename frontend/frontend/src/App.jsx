import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './admin';
import Login from './login';
import User from './user';
import React from 'react';
import UserList from './usersdetail';
import { UserDetail } from './userdetail';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/details" element={< UserList/>} />
        
        // In your router setup
        <Route path="/user/:id" element={<UserDetail />} />
       
        
      </Routes>
    </Router>
  );
};

export default App;
