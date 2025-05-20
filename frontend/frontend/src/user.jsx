import { useCounter } from './hooks/conthook';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();
  const { state, dispatch } = useCounter();
  
  console.log('State value:', state); // Better logging for objects

  const handleClick = () => {
    if (state.id) {
      navigate(`/user/${state.id}`);
    } else {
      console.error('No user ID found in state');
    }
  };

  return (
    <div>
      <h1>user page</h1>
      <h2>{state.role}</h2>
      <button onClick={handleClick}>Get your details!!</button>
      <button onClick={() => {dispatch({type:"LOGOUT"})
    navigate("/")}}>logout!!</button>
    </div>
  );
}

export default User;