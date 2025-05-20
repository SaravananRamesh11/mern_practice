import { useCounter } from './hooks/conthook'; // ✅ adjust path as needed
import React from 'react'; // ✅ Add this
import axios from 'axios'; // ✅ Add this
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate=useNavigate()
  const{state,dispatch}=useCounter()
  console.log(`this is the state value:${state}`)
  return (
    <div>
      <h1>admin page</h1>
      <h2>{state.role}</h2>
      <button onClick={()=>{
      
        navigate("/details");

    
      }}> get all details</button>
      <button onClick={() => {dispatch({type:"LOGOUT"})
    navigate("/")}}>logout!!</button>
    </div>
  
  );

};
export default Admin;
