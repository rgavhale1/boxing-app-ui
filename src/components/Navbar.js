import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
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

            {/* ✅ NO ACTION TABS */}
            <li style={{ cursor: "default", opacity: 0.7 }}>FightStore</li>
            <li style={{ cursor: "default", opacity: 0.7 }}>Collaboration</li>
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