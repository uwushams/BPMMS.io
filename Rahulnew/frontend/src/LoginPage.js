import React, { useState } from 'react';
import './LoginPage.css'; // Import LoginPage CSS

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Clear any previous error message
      setError('');

      // Redirect to another page or perform any action for successful login
      console.log('Login successful');
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container"> {/* Apply container class from LoginPage.css */}
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button
          type="submit"
          className="submit-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
