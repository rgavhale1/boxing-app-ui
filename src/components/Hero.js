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
        preload="metadata"   // ⚡ faster load
        poster="/poster.jpg" // 🖼️ fallback image (VERY IMPORTANT for mobile)
      >
        <source src="/boxing.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔴 overlay */}
      <div className="hero-overlay"></div>

    </section>
  );
};

export default Hero;