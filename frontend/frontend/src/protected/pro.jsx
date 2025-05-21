
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







// import { useCounter } from "../hooks/conthook";
// import { Navigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// export const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { state, dispatch } = useCounter();
//   const [shouldRedirect, setShouldRedirect] = useState(false);

//   useEffect(() => {
//     if (!state.id || !allowedRoles.includes(state.role)) {
//       dispatch({ type: "LOGOUT" });
//       setShouldRedirect(true);
//     }
//   }, [state, allowedRoles, dispatch]);

//   if (shouldRedirect) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };


// import './error.css'
// import { useCounter } from "../hooks/conthook";
// import { Navigate, useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// export const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { state, dispatch } = useCounter();
//   const [accessDenied, setAccessDenied] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!state.id || !allowedRoles.includes(state.role)) {
//       setAccessDenied(true);
//     }
//   }, [state, allowedRoles]);

//   if (accessDenied) {
//     return (
//       <div className="access-denied-container">
//         <h2>Access Denied</h2>
//         <p>You don't have permission to access this resource.</p>
//         <button 
//           onClick={() => navigate(-1)} // Go back to previous page
//           className="back-button"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return children;
// };


import './error.css';
import { useCounter } from "../hooks/conthook";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { state } = useCounter();
  const [accessDenied, setAccessDenied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check access rights whenever state or allowedRoles change
    const hasAccess = state.id && allowedRoles.includes(state.role);
    setAccessDenied(!hasAccess);
  }, [state, allowedRoles]);

  if (accessDenied) {
    return (
      <div className="access-denied-container">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this resource.</p>
        <div className="button-group">
          <button 
            onClick={() => navigate(-1)} // Go back to previous page
            className="back-button"
          >
            Go Back
          </button>
          <button 
            onClick={() => navigate('/')} // Go to home page
            className="home-button"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return children;
};