import React, { useState, useEffect } from "react";

const JoinModal = ({ close, program }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    time: "",
    program: program || ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (program) {
      setForm((prev) => ({ ...prev, program }));
    }
  }, [program]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("https://boxing-app-management.onrender.com/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setLoading(false);
          close();
        }, 2000); // show success popup for 2 seconds
      } else {
        alert("Error submitting form: " + response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to server");
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Join {form.program} Program</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
          <input name="email" placeholder="Email" onChange={handleChange} required />

          <select name="time" onChange={handleChange} required>
            <option value="">Select Time</option>
            <option value="6 AM - 7 AM">6 AM - 7 AM</option>
            <option value="7 AM - 8 AM">7 AM - 8 AM</option>
            <option value="6 PM - 7 PM">6 PM - 7 PM</option>
          </select>

          <input type="hidden" name="program" value={form.program} readOnly />

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>Submit</button>
            <button type="button" onClick={close} disabled={loading}>Close</button>
          </div>
        </form>

        {/* Loading / Success Popup */}
        {loading && (
          <div className="popup-overlay">
            <div className="popup-box">
              {success ? (
                <h3>✅ Registration Successful! We’ll contact you soon.</h3>
              ) : (
                <h3>⏳ Submitting your registration… Please wait.</h3>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinModal;
