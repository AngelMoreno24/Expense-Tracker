import React, { useState } from 'react';

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
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
  
    return (
      <div className="login-page">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
