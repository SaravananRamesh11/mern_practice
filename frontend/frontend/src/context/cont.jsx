

import { createContext, useReducer, useContext } from "react";
import React from 'react'; // ✅ Add this

export const CounterContext = createContext();

const localData = JSON.parse(localStorage.getItem("user"));

const initialState = localData || {
  email: "",
  role: ""
};

export function counterReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      const userData = {
        email: action.payload.mail,
        role: action.payload.role
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;

    case "LOGOUT":
      localStorage.removeItem("user");
      return { email: "", role: "" };

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
      dispatch({ type: "LOGIN", payload: { mail: parsed.email, role: parsed.role } });
    }
  }, []);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}
