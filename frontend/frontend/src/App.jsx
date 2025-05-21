import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './admin';
import Login from './login';
import User from './user';
import React from 'react';
import UserList from './usersdetail';
import { UserDetail } from './userdetail';
import {ProtectedRoute} from "./protected/pro"; // import your file


import { useAutoLogout } from './hooks/useAutoLogout';




// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/admin" element={<Admin />} />
//         <Route path="/user" element={<User />} />
//         <Route path="/details" element={< UserList/>} />
        
//         // In your router setup
//         <Route path="/user/:id" element={<UserDetail />} />
       
        
//       </Routes>
//     </Router>
//   );
// };





const App = () => {
  useAutoLogout();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <User />
            </ProtectedRoute>
          }
        />
        
        <Route path="/details" element={
          
          <ProtectedRoute allowedRoles={["admin"]}>
              <UserList/>
            </ProtectedRoute>
          
          } />


        <Route path="/user/:id" element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDetail />
          </ProtectedRoute>
          
          
          } />
      </Routes>
    </Router>
  );
};


export default App;
