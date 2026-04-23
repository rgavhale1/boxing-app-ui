import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      // First go to home route
      navigate("/", { replace: false });
      // Delay scroll until after navigation
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // Already on home, just scroll
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Boxing Avenue Logo" />
      </div>

      <ul>
        {role !== "ADMIN" && (
          <>
            <li onClick={() => goToSection("home")}>Home</li>
            <li onClick={() => goToSection("about")}>About Us</li>
            <li onClick={() => goToSection("programs")}>Services</li>
          </>
        )}

        <li>
          <button
            className="join-btn"
            onClick={() => {
              if (role === "ADMIN") {
                navigate("/admin");
              } else {
                navigate("/login");
              }
            }}
          >
            {role === "ADMIN" ? "Admin Dashboard" : "Admin"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
