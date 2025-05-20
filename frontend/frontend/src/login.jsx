import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCounter } from './hooks/conthook';
import { useNavigate } from 'react-router-dom';



// Use the same CSS as before

const Login = () => {
  const navigate = useNavigate();
  const{state,dispatch}=useCounter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try{
       console.log('Form data:', data);
    const repeat=await axios.post("http://localhost:3000/api/vista/login",{
      "email": data.email, 
      "password": data.password
    })
    console.log("after fetching",repeat.data.id, repeat.data.token,repeat.data.role)
    
    if (repeat.data.token) {
    localStorage.setItem('token', repeat.data.token);
    console.log('Login successful!');
  }

    if(repeat.data.token){
      dispatch({type:"LOGIN",payload:{...repeat.data}});
    }
    
    

    navigate(`/${repeat.data.role}`);
    }
     catch (error) {
    // ✅ This properly displays the error message from the backend
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message); // e.g., "the mail is wrong!!"
    } else {
      alert("Unexpected server error");
    }
  }
   

  
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 2,
                  message: "Password must be at least 6 characters"
                }
              })}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? 'submitting' : ''}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <a href="/forgot-password">Forgot password?</a>
          <span>Don't have an account? <a href="/register">Sign up</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;