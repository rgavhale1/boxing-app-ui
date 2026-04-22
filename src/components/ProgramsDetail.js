import React from "react";

const ProgramsDetail = () => {
  return (
    <section className="programs-detail">
      <h2>BOXING AVENUE PROGRAMS</h2>

      <div className="programs-grid">
        {/* PROGRAM 1 */}
        <div className="program-card">
          <h3>Foundation Program (Group Classes)</h3>
          <p>Perfect for beginners building basics & fitness</p>

          <h4>₹3000</h4>

          <ul>
            <li>4 days/week</li>
            <li>Fixed batch timings</li>
            <li>Limited access</li>
          </ul>
        </div>

        {/* PROGRAM 2 */}
        <div className="program-card">
          <h3>Hybrid Program (One-on-One)</h3>
          <p>Personalized training for faster results</p>

          <h4>
            ₹6500 <span className="old-price">₹10000</span>
          </h4>

          <ul>
            <li>5 days/week</li>
            <li>Unlimited access</li>
          </ul>
        </div>

        {/* PROGRAM 3 */}
        <div className="program-card">
          <h3>Elite Program</h3>
          <p>Complete transformation & peak performance</p>

          <h4>
            ₹13500 <span className="old-price">₹18000</span>
          </h4>

          <ul>
            <li>5 days/week</li>
            <li>Unlimited access</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProgramsDetail;