import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Email validation function
  const validateEmail = (email) => {
    // Basic regex: ensures format like user@example.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    // Run validation before sending
    if (!validateEmail(email)) {
      setMessage("✖ Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch(
  `https://boxing-app-management.onrender.com/api/auth/forgot-password?email=${email}&username=${username}`,
  {
    method: "POST"
  }
);

      if (res.ok) {
        setMessage("✔ Reset link sent to your email.");
      } else {
        setMessage("✖ Invalid email or username.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠ Server error, please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Forgot Password</h2>
        <p className="modal-subtitle">
          Enter your username and registered email to receive a reset link.
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="modal-actions">
          <button className="send-btn" onClick={handleSubmit}>
            Send Reset Link
          </button>
          <button className="close-btn" onClick={onClose}>
            Cancel
          </button>
        </div>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
