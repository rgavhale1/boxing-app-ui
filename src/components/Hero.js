import React from "react";

const Hero = () => {
  return (
    <section className="hero" id="home">

      {/* 🎥 Optimized background video */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"                 // ⚡ load immediately
        poster="/poster.jpg"           // 🖼️ fallback for mobile
      >
        <source src="/boxing.mp4" type="video/mp4" />
      </video>

      {/* 🔴 overlay */}
      <div className="hero-overlay"></div>

    </section>
  );
};

export default Hero;