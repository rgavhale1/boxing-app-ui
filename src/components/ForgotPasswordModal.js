import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [message, setMessage] = useState({ type: "", text: "" });

  // ✅ NEW STATES (like JoinModal)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {

    setMessage({ type: "", text: "" });
    setSuccess(false);

    if (!validateEmail(email)) {
      setMessage({
        type: "error",
        text: "✖ Please enter a valid email address."
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://boxing-app-management.onrender.com/api/auth/forgot-password?email=${email}&username=${username}`,
        { method: "POST" }
      );

      if (res.ok) {
        setLoading(false);
        setSuccess(true);

        // auto close like JoinModal
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);

      } else {
        setLoading(false);
        setMessage({
          type: "error",
          text: "✖ Invalid email or username."
        });
      }

    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessage({
        type: "warning",
        text: "⚠ Server error, please try again."
      });
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
          <button
            className="send-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <button
            className="close-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>

        {/* ❌ ERROR MESSAGE */}
        {message.text && (
          <p className={`message ${message.type}`}>
            {message.text}
          </p>
        )}

        {/* 🚀 POPUP (same style as JoinModal) */}
        {(loading || success) && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h3 style={{ color: "white" }}>
                {success
                  ? "✅ Reset link sent successfully!"
                  : "⏳ Sending reset link… Please wait."}
              </h3>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPasswordModal;