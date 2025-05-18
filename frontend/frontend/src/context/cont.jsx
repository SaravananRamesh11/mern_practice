// CounterContext.js
import { createContext, useReducer, useContext } from "react";

export const CounterContext = createContext();
// Initial state
const initialState = {
    email:"",
    role:""
};

// Reducer function
export function counterReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { email:action.payload.mail,role:action.payload.role};
    case "LOGOUT":
      return { initialState };
    default:
      return {initialState};
  } 
}



// Context provider
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}


