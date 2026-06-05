import React, { useState } from 'react';
import './ForgotPasswordModal.css';

const ForgotPasswordModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email) {
      setMessage('Please enter both username and registered email.');
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage('Sending reset link...');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage('✓ Reset link sent to your email. Check your inbox!');
      setIsSuccess(true);
      setUsername('');
      setEmail('');

      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="forgotPasswordOverlay" onClick={onClose}>
      <div className="forgotPasswordModal" onClick={(e) => e.stopPropagation()}>
        <button className="forgotPasswordClose" onClick={onClose}>×</button>

        <div className="forgotPasswordHeader">
          <span className="forgotPasswordIcon">🔐</span>
          <h3>Forgot Password?</h3>
          <p>No worries! We'll help you recover your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="forgotPasswordForm">
          <div className="forgotPasswordGroup">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading || isSuccess}
            />
          </div>

          <div className="forgotPasswordGroup">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isSuccess}
            />
          </div>

          {message && (
            <div className={`forgotPasswordMessage ${isSuccess ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="forgotPasswordActions">
            <button type="submit" className="forgotPasswordSend" disabled={isLoading || isSuccess}>
              {isLoading ? 'Sending...' : isSuccess ? '✓ Sent!' : 'Send Reset Link'}
            </button>
            <button type="button" className="forgotPasswordCancel" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
