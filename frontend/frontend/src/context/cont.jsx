

import { createContext, useReducer, useContext } from "react";
import React from 'react'; // ✅ Add this

export const CounterContext = createContext();

const localData = JSON.parse(localStorage.getItem("user"));

const initialState = localData || {
  id: "",
  role: "",
};

export function counterReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      let userData = {
        id: action.payload.id,
        role: action.payload.role
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;

    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return { id: "", role: "" };

    default:
      return state;
  }
}

import { useEffect } from "react";

export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  useEffect(() => {
    const localData = localStorage.getItem("user");
    if (localData) {
      const parsed = JSON.parse(localData);
      dispatch({ type: "LOGIN", payload: { id: parsed.id, role: parsed.role } });
    }
  }, []);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}






// import { createContext, useReducer, useContext } from "react";
// import React from 'react';

// export const CounterContext = createContext();

// const initialState = {
//   id: "",
//   role: ""
// };

// export function counterReducer(state, action) {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         id: action.payload.id,
//         role: action.payload.role
//       };

//     case "LOGOUT":
//       return initialState;

//     default:
//       return state;
//   }
// }

// export function CounterProvider({ children }) {
//   const [state, dispatch] = useReducer(counterReducer, initialState);

//   return (
//     <CounterContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CounterContext.Provider>
//   );
// }