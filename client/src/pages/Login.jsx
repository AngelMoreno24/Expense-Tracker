import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Login.css";
import { useNavigate } from "react-router-dom";

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState(null);
  
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
  

    const handleSubmit2 = async (event) => {
      event.preventDefault();
      try {


        const data = 
        {
            email: email,
            password: password
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
    

    const Signup = async (event) => {
      event.preventDefault();
      try {

        const data = 
        {
            username: newUsername,
            email: newEmail,
            password: newPassword
        };

        const response = await axios.post("accounts/create", data);

  
        window.location.href = '/'; 
  
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
        <div className='split'>
          <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit2} className="login-form">
              {error && <p className="error-message">{error}</p>}
              <div className="grid-layout">
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
              <div className="grid-layout">
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
          
          <div>
            <h2>Signup</h2>
            <form onSubmit={Signup} className="login-form">
              {error && <p className="error-message">{error}</p>}
              
              <div className='grid-layout'>

                <label htmlFor="email">Username:</label>
                <input
                  type="text"
                  id="newUsername"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className='grid-layout'>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="newEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className='grid-layout'>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          </div>




        </div>

      </div>
    );
}

export default LogIn
