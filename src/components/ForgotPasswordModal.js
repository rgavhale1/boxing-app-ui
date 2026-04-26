import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
       const res = await fetch(
      `https://boxing-app-management.onrender.com/api/auth/forgot-password?email=${encodeURIComponent(email)}`,
      {
        method: "POST"
      }
    );

      const text = await res.text();
3
      if (res.ok) {
        setMessage("✔ Reset link sent to your email.");
      } else {
        setMessage("✖ Invalid email address.");
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
        <p className="modal-subtitle">Enter your registered email to receive a reset link.</p>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="modal-actions">
          <button className="send-btn" onClick={handleSubmit}>Send Reset Link</button>
          <button className="close-btn" onClick={onClose}>Cancel</button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
