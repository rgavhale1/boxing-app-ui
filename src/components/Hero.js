import React from "react";

const Hero = () => {
  return (
    <section className="hero" id="home">
      {/* 🎥 background video */}
      <video autoPlay muted loop playsInline className="hero-video">
        <source src="/boxing.mp4" type="video/mp4" />
      </video>

      {/* 🔴 overlay */}
      <div className="hero-overlay"></div>

      {/* 📝 content */}
      {/* Removed the <h1> element */}
    </section>
  );
};
export default Hero;
