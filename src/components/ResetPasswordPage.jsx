import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ResetPasswordPage.module.css";

const ResetPasswordPage = ({ token }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryToken = new URLSearchParams(location.search).get("token");
  const resetToken = token || queryToken;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    setMessage({ type: "", text: "" });
    setSuccess(false);

    if (!resetToken) {
      setMessage({
        type: "error",
        text: "✖ Reset token is missing. Please use the link from your email.",
      });
      return;
    }

    if (password !== confirm) {
      setMessage({
        type: "error",
        text: "✖ Passwords do not match.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://boxing-app-management.onrender.com/api/auth/reset-password?token=${encodeURIComponent(resetToken)}&newPassword=${encodeURIComponent(password)}`,
        { method: "POST" }
      );

      if (res.ok) {
        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setLoading(false);
        setMessage({
          type: "error",
          text: "✖ Reset link invalid or expired.",
        });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessage({
        type: "warning",
        text: "⚠ Server error, please try again.",
      });
    }
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-box"]}>
        <h2 className={styles["modal-title"]}>Reset Password</h2>

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

        <div className={styles["modal-actions"]}>
          <button
            className={styles["send-btn"]}
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>

        {message.text && (
          <p className={`${styles["message"]} ${styles[message.type]}`}>{message.text}</p>
        )}

        {(loading || success) && (
          <div className={styles["popup-overlay"]}>
            <div className={styles["popup-box"]}>
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
