import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("https://boxing-app-management.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // 🔥 backend returns STRING token
      const token = await res.text();

      if (res.ok && token) {
        localStorage.setItem("token", token);  // store JWT token
        navigate("/admin");                    // go to dashboard
      } else {
        alert("Invalid credentials");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <p>Access your dashboard</p>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <div className="login-footer">
          <span onClick={() => alert("Reset link sent!")}>
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;