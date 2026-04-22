import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      {/* 🎥 background video */}
      <video autoPlay muted loop playsInline className="hero-video">
        <source src="/boxing.mp4" type="video/mp4" />
      </video>

      {/* 🔴 overlay */}
      <div className="hero-overlay"></div>

      {/* 📝 content */}
      <h1>FIND THE SESSION BUILT FOR YOU</h1>
    </section>
  );
};

export default Hero;