// src/components/LoginForm.js

import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from 'axios';



const LoginForm = ({ onLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8082/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('auth_token', response.data.token);

      onLogin(response.data); 

    }
    catch (error) {
      const defaultErrorMessage = 'Login failed. Please check your credentials and try again.';
      setErrorMessage(error.response?.data?.message || defaultErrorMessage);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
