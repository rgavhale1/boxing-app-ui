import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Programs from "./components/Programs";
import ProgramsDetail from "./components/ProgramsDetail";
import Footer from "./components/Footer";

import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

import "./App.css";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <ProgramsDetail />
      <Footer />
    </>
  );
}

// 👇 wrapper to control navbar visibility
function Layout() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/admin";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Layout />
      </div>
    </Router>
  );
}

export default App;