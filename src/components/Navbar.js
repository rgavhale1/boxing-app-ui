import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // 🔐 get role
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Boxing Avenue Logo" />
      </div>

      <ul>
        {/* 👇 Show only for USER */}
        {role !== "ADMIN" && (
          <>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
          </>
        )}

        {/* 👇 Admin button */}
        {role === "ADMIN" ? (
          <li>
            <button
              className="join-btn"
              onClick={() => navigate("/admin")}
            >
              Admin Dashboard
            </button>
          </li>
        ) : (
          <li>
            <button
              className="join-btn"
              onClick={() => navigate("/login")}
            >
              Admin
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;