
// import { useCounter } from "../hooks/conthook";
// import { Navigate } from "react-router-dom";
// import React from "react";

// export const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { state,dispatch } = useCounter();

//   if (!state.id || !allowedRoles.includes(state.role)) {
//     dispatch({type:"LOGOUT"})
//     return <Navigate to="/" replace />; // 
//   }

//   return children;
// };



import { useCounter } from "../hooks/conthook";
import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { state, dispatch } = useCounter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!state.id || !allowedRoles.includes(state.role)) {
      dispatch({ type: "LOGOUT" });
      setShouldRedirect(true);
    }
  }, [state, allowedRoles, dispatch]);

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  return children;
};
