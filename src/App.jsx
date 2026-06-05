import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Programs from './components/Programs';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ResetPasswordPage from './components/ResetPasswordPage';
function Home({ onBookTrial }) {
  return (
    <>
      <Hero onBookTrial={onBookTrial} />
      <Services />
      <Programs onBookTrial={onBookTrial} />
      <Footer onBookTrial={onBookTrial} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbar = location.pathname === '/admin';

  const handleBookTrial = () => {
    navigate('/book');
  };

  return (
    <div className="App">
      {!hideNavbar && <Navbar onBookTrial={handleBookTrial} />}
      <Routes>
        <Route path="/" element={<Home onBookTrial={handleBookTrial} />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
