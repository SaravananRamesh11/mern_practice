import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './admin';
import Login from './login';
import User from './user';
import React from 'react'; // ✅ Add this



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
       
        
      </Routes>
    </Router>
  );
};

export default App;
