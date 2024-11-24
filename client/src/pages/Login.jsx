import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState(null);
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Basic validation
      if (!email || !password) {
        setError('Both fields are required.');
        return;
      }
  
      setError(''); // Clear errors
      console.log('Logging in:', { email, password });
  
      // Handle actual login logic here (e.g., call an API)
      // Example:
      // axios.post('/api/login', { email, password })
      //   .then(response => handleSuccess(response))
      //   .catch(error => setError(error.message));
    };



    const handleSubmit2 = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post("/Login", null, {
          params: {
              email: email,
              password: password
          }
      });
        const { Token } = response.data;
        const { Role } = response.data;
  
        // Save token in local storage or state
        localStorage.setItem('token', Token);
        setToken(Token);
        localStorage.setItem('role', Role);
        setToken(Role);
        window.location.href = '/Menu'; 
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
    





    return (
      
      <div className="login-page">
        <h2>Login</h2>
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
