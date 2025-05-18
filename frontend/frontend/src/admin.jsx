import { useCounter } from './hooks/conthook'; // ✅ adjust path as needed
import React from 'react'; // ✅ Add this


const Admin = () => {
  const{state,dispatch}=useCounter()
  console.log(`this is the state value:${state}`)
  return (
    <div>
      <h1>{state.email}</h1>
      <h2>{state.role}</h2>
    </div>
  
  );

};
export default Admin;
