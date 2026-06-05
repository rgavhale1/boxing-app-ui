import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Please enter username and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://boxing-app-management.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setErrorMessage('Invalid username or password.');
        setLoading(false);
        return;
      }

      const data = await response.text();
      
      // Store the token from the response

      if (data) {
        localStorage.setItem('token', data);
        navigate('/admin');
      } else {
        setErrorMessage('No token received from server.');
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-brand">
          <div className="login-logo">BA</div>
          <span>Boxing Avenue</span>
        </div>
        <h2>Admin Login</h2>
        <p>Sign in to manage bookings and view today’s sessions.</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage('');
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage('');
          }}
        />

        <button type="button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <div className="login-footer">
          <span onClick={() => setShowModal(true)}>Forgot Password?</span>
        </div>
      </div>

      {showModal && <ForgotPasswordModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminLogin;
