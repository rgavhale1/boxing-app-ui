import React, { useState } from "react";
import JoinModal from "./JoinModal";

const Programs = () => {
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  return (
    <>
      <section className="programs" id="programs">
        
        {/* ✅ COMMON HEADING */}
        <h2 className="programs-heading">
          FIND THE SESSION BUILT FOR YOU
        </h2>

        <div className="card">
          <h3>🥊 Boxing</h3>
          <button onClick={() => { setSelectedProgram("Boxing"); setOpen(true); }}>
            Join
          </button>
        </div>

        <div className="card">
          <h3>💪 Muay Thai</h3>
          <button onClick={() => { setSelectedProgram("Muay Thai"); setOpen(true); }}>
            Join
          </button>
        </div>

        <div className="card">
          <h3>🤼 Wrestling</h3>
          <button disabled>Coming Soon</button>
        </div>

      </section>

      {open && <JoinModal close={() => setOpen(false)} program={selectedProgram} />}
    </>
  );
};

export default Programs;