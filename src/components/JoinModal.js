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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (program) {
      setForm((prev) => ({ ...prev, program }));
    }
  }, [program]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const validateForm = () => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(form.mobile)) {
      setErrorMessage("✖ Please enter a valid 10-digit mobile number.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(form.email)) {
      setErrorMessage("✖ Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://boxing-app-management.onrender.com/api/join",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );

      if (response.ok) {
        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
          close();
        }, 2000);
      } else {
        setErrorMessage("✖ Error submitting form: " + response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("⚠ Failed to connect to server");
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

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* ✅ FIXED POPUP (same UI, only logic fixed) */}
        {(loading || success) && (
         <div className="popup-overlay">
  <div className="popup-box">
    <h3 style={{ color: "black" }}>
      {success
        ? "✅ Registration Successful! We’ll contact you soon."
        : "⏳ Submitting your registration… Please wait."}
    </h3>
  </div>
</div>
        )}
      </div>
    </div>
  );
};

export default JoinModal;