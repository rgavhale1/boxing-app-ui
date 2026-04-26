import React, { useState } from "react";

const ResetPasswordPage = ({ token }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (password !== confirm) {
      setMessage("✖ Passwords do not match.");
      return;
    }

    try {
      // Send token and newPassword as query parameters
      const res = await fetch(
        `http://localhost:8080/api/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(password)}`,
        {
          method: "POST"
        }
      );

      const text = await res.text();

      if (res.ok) {
        setMessage("✔ Password reset successful. Redirecting to login...");
        setTimeout(() => (window.location.href = "/login"), 2000);
      } else {
        setMessage("✖ Reset link invalid or expired.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠ Server error, please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <div className="modal-actions">
          <button className="send-btn" onClick={handleReset}>Update Password</button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
