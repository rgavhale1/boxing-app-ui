import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;