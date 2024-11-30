import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Login.css";
import { useNavigate } from "react-router-dom";

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState(null);
  
  

    const handleSubmit2 = async (event) => {
      event.preventDefault();
      try {


        const data = 
        {
            email: "angel@email.com",
            password: "password1"
        };

        const response = await axios.post("accounts/login", data);

        const { Token } = response.data;
  
        // Save token in local storage or state
      localStorage.setItem("accessToken", response.data.accessToken);

        setToken(Token);

        console.log(token);
        window.location.href = '/Home'; 
        //console.log("Logged in successfully:", Token);
  
        setError('');
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Invalid email or password");
        } else {
          setError("An unexpected error occurred");
        }
        console.error("Error logging in:", err);
      }
    };
    

    useEffect(() => {
      
      const token = localStorage.getItem("accessToken");
      if (token) {
        window.location.href = 'Home';
      }
    }, []); 


    return (
      
      <div className="login-page">
        <h2>Signup</h2>
        
        <form onSubmit={handleSubmit2} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    );
}

export default LogIn
