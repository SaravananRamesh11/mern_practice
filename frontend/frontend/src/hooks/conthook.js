import { createContext, useReducer, useContext } from "react";
import { CounterContext } from "../context/cont";

export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) throw new Error("useCounter must be used within CounterProvider");
  return context;
}