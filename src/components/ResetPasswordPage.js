import React, { useState } from "react";

const ResetPasswordPage = ({ token }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [message, setMessage] = useState({ type: "", text: "" });

  // ✅ NEW STATES (like other modals)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {

    setMessage({ type: "", text: "" });
    setSuccess(false);

    if (password !== confirm) {
      setMessage({
        type: "error",
        text: "✖ Passwords do not match."
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://boxing-app-management.onrender.com/api/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(password)}`,
        { method: "POST" }
      );

      if (res.ok) {
        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);

      } else {
        setLoading(false);
        setMessage({
          type: "error",
          text: "✖ Reset link invalid or expired."
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
          <button
            className="send-btn"
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>

        {/* ❌ ERROR MESSAGE */}
        {message.text && (
          <p className={`message ${message.type}`}>
            {message.text}
          </p>
        )}

        {/* 🚀 POPUP (same style as other modals) */}
        {(loading || success) && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h3 style={{ color: "black" }}>
                {success
                  ? "✅ Password reset successful!"
                  : "⏳ Updating password… Please wait."}
              </h3>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResetPasswordPage;