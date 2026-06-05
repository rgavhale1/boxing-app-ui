import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {
  Crown,
  Dumbbell,
  RotateCcw,
  Activity,
  Target,
  Zap,
  Shield,
  Home,
  Cloud,
  Repeat,
} from 'lucide-react';
import styles from "./BookingForm.module.css";
import groupClassesImg from "./groupclasses.jpg";

const TIME_SLOTS = [
  "6 AM - 7 AM",
  "7 AM - 8 AM",
  "6 PM - 7 PM",
];

const SERVICES = [
  { id: "boxing", label: "Boxing", icon: "🥊" },
  { id: "muaythai", label: "Muay Thai", icon: "🥋" },
];

const PROGRAMS = [
  {
    id: "hybrid",
    label: "Hybrid Program (One-on-One)",
    shortLabel: "Hybrid (One-on-One)",
    desc: "Personalized training for faster results",
    price: "₹15000",
    perMonth: "₹15,000 / month",
    originalPrice: null,
    subtitle: "STRENGTH + CONDITIONING + SKILL",
    features: [
      { icon: <Dumbbell size={18} strokeWidth={2} />, title: "STRENGTH TRAINING", desc: "Build raw power and functional muscle with performance-driven workouts designed for real results." },
      { icon: <RotateCcw size={18} strokeWidth={2} />, title: "MOBILITY", desc: "Improve joint health and movement efficiency to move better, train longer, and injury-free." },
      { icon: <Repeat size={18} strokeWidth={2} />, title: "FLEXIBILITY", desc: "Enhance range of motion, reduce muscle tightness, and support better recovery through structured flexibility work." },
      { icon: <Target size={18} strokeWidth={2} />, title: "SKILL DEVELOPMENT", desc: "Master boxing fundamentals, sharpen technique, timing, and footwork, and elevate your fight IQ with expert coaching." }
    ],
    icon: <Dumbbell size={24} strokeWidth={1.8} />,
    tag: "POPULAR",
  },
  {
    id: "elite",
    label: "Elite Program",
    shortLabel: "Elite Program",
    desc: "Complete transformation & peak performance",
    price: "₹20000",
    perMonth: "₹20,000 / month",
    originalPrice: "₹25000",
    subtitle: "BREATHWORK + STRENGTH + COMBAT + MOBILITY",
    features: [
      { icon: <Cloud size={18} strokeWidth={2} />, title: "BREATHWORK", desc: "Master advanced breathing techniques to enhance oxygen efficiency, improve mental focus, reduce stress, and optimize performance during intense training sessions." },
      { icon: <Dumbbell size={18} strokeWidth={2} />, title: "STRENGTH TRAINING", desc: "Build raw power and functional muscle with progressive overload and performance-driven workouts designed for peak athletic performance and real results." },
      { icon: <Zap size={18} strokeWidth={2} />, title: "MUAY THAI AND BOXING", desc: "Master both disciplines with expert coaching in striking, footwork, clinch work, and technical proficiency to become a well-rounded fighter." },
      { icon: <RotateCcw size={18} strokeWidth={2} />, title: "MOBILITY AND FLEXIBILITY", desc: "Enhance range of motion, reduce muscle tightness, prevent injuries, and support faster recovery through structured mobility and flexibility protocols." },
      { icon: <Home size={18} strokeWidth={2} />, title: "GYM MEMBERSHIP", desc: "Unlimited access to our premium training facility with state-of-the-art equipment, allowing you to train whenever and however you need." }
    ],
    icon: <Crown size={24} strokeWidth={1.8} />,
    tag: "PREMIUM",
  },
];

const FOOTER_BADGES = [
  { icon: "🛡", title: "CERTIFIED TRAINERS", desc: "Experienced and trusted professionals" },
  { icon: "📅", title: "FLEXIBLE SCHEDULE", desc: "Sessions that fit your lifestyle" },
  { icon: "👤", title: "1-ON-1 SUPPORT", desc: "Personal attention every step of the way" },
  { icon: "🏆", title: "RESULT DRIVEN", desc: "Focused on real, measurable progress." },
];

export default function BookingForm({ isOpen = true, onClose = () => {}, embedded = false }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    program: "",
    preferredTime: "",
  });
  const location = useLocation();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const programParam = params.get('program');
      if (programParam) {
        setForm((f) => ({ ...f, program: programParam }));
      }
    } catch (err) {
      // ignore if location is not available
    }
  }, [location.search]);

  const [serviceOpen, setServiceOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const selectService = (id) => { setForm({ ...form, service: id }); setServiceOpen(false); };
  const selectProgram = (id) => { setForm({ ...form, program: id }); setProgramOpen(false); };
  const selectTime = (slot) => setForm({ ...form, preferredTime: slot });

  const selectedService = SERVICES.find((s) => s.id === form.service);
  const selectedProg = PROGRAMS.find((p) => p.id === form.program);

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !form.phone || !form.program || !form.preferredTime) {
      setErrorMsg("Please fill in all fields and select a time slot.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      // Calculate discount if applicable
      let discountPercentage = null;
      if (selectedProg?.originalPrice) {
        const originalAmount = parseFloat(selectedProg.originalPrice.replace('₹', ''));
        const discountedAmount = parseFloat(selectedProg.price.replace('₹', ''));
        discountPercentage = Math.round(((originalAmount - discountedAmount) / originalAmount) * 100);
      }

      // Format program details as a single string
      let programTypeString = "";
      if (selectedProg) {
        programTypeString = `${selectedProg.label}\n₹${selectedProg.price.replace('₹', '')} / MONTH\n${selectedProg.subtitle}`;
        if (selectedProg.originalPrice) {
          programTypeString += `\n₹${selectedProg.originalPrice.replace('₹', '')}\nSAVE ${discountPercentage}%`;
        }
      }

      const response = await fetch("https://boxing-app-management.onrender.com/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          mobile: form.phone,
          service: selectedService?.label || form.service,
          programType: programTypeString,
          time: form.preferredTime,
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Booking failed. Please try again.");
      }
      setStatus("success");
      setShowSuccessPopup(true);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMsg("");
    setShowSuccessPopup(false);
    setForm({ fullName: "", email: "", phone: "", service: "", program: "", preferredTime: "" });
    onClose();
  };

  if (!isOpen) return null;

  /* ─── LEFT PANEL: Program Cards ─── */
  const LeftPanel = (
    <div className={styles.leftPanel}>

      {/* Header at top — Hook first, then programs */}
      <div className={styles.leftHeader}>
        <p className={styles.leftOverline}>PERSONAL TRAINING</p>
        <h2 className={styles.leftTitle}>
          YOUR GOALS.
          <br />
          <span>OUR MISSION.</span>
        </h2>
        <p className={styles.leftSub}>
          Choose a program, take the first step towards your strongest version.
        </p>
      </div>

      {/* Program Cards stacked vertically */}
      <div className={styles.programCards}>
        {PROGRAMS.map((prog, idx) => {
          const isSelected = form.program === prog.id;

          return (
            <div
              key={prog.id}
              className={styles.progCard}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Glow border on selected */}
              <div className={styles.progCardGlow} />

              {/* Top row: tag + check */}
              <div className={styles.progCardTopRow}>
                <span
                  className={`${styles.progTag} ${
                    isSelected ? styles.progTagActive : ""
                  }`}
                >
                  {prog.tag}
                </span>

                {isSelected && (
                  <span className={styles.progCheck}>✓ SELECTED</span>
                )}
              </div>

              {/* Title + inline price */}
              <div className={styles.progCardBody}>
                <div className={styles.progTitleRow}>
                  <h3 className={styles.progName}>{prog.label}</h3>
                  <div className={styles.progPriceBlock}>
                    <span className={styles.progPriceInline}>{prog.price}</span>
                    <span className={styles.progPerMonth}>/month</span>
                  </div>
                </div>
                {prog.subtitle && <p className={styles.progSubtitle}>{prog.subtitle}</p>}
              </div>

              {/* Secondary pricing info */}
              {prog.originalPrice && (
                <div className={styles.progPriceRow}>
                  <span className={styles.progOriginal}>
                    {prog.originalPrice}
                  </span>
                  <span className={styles.progSaveBadge}>
                    SAVE {prog.id === "hybrid" ? "35%" : "20%"}
                  </span>
                </div>
              )}

              {/* Features */}
              <div className={styles.progFeatures}>
                {prog.features.map((f, idx) => (
                  <div key={idx} className={styles.progFeat}>
                    {typeof f === 'string' ? (
                      <>
                        <span className={styles.progFeatDot} />
                        {f}
                      </>
                    ) : (
                      <div className={styles.progFeatureDetail}>
                        <div className={styles.progFeatureHeading}>
                          <span className={styles.progFeatureIcon}>{f.icon}</span>
                          <div className={styles.progFeatureTitle}>{f.title}</div>
                        </div>
                        <div className={styles.progFeatureDesc}>{f.desc}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Bottom trust badges */}
      <div className={styles.leftTrustRow}>
        <div className={styles.trustItem}>
          <span>🛡</span> Certified Coaches
        </div>
        <div className={styles.trustItem}>
          <span>📅</span> Flexible Schedule
        </div>
        <div className={styles.trustItem}>
          <span>🏆</span> Real Results
        </div>
      </div>

    </div>
  );

  /* ─── RIGHT PANEL: Booking Form ─── */
  const FormContent = (
    <>
      <div className={styles["bs-form-header"]}>
        <h2 className={styles["bs-form-title"]}>BOOK A SESSION</h2>
        <div className={styles["bs-form-divider"]} />
        <p className={styles["bs-form-sub"]}>
          Take the first step towards<br />a stronger, healthier you.
        </p>
      </div>

      <div className={styles["bs-form"]}>

        {/* Full Name */}
        <div className={styles["bs-field"]}>
          <label className={styles["bs-label"]}>Full Name</label>
          <div className={styles["bs-input-wrap"]}>
            <span className={styles["bs-input-icon"]}>👤</span>
            <input className={styles["bs-input"]} name="fullName" type="text"
              placeholder="Enter your name" value={form.fullName} onChange={handleChange} />
          </div>
        </div>

        {/* Email */}
        <div className={styles["bs-field"]}>
          <label className={styles["bs-label"]}>Email Address</label>
          <div className={styles["bs-input-wrap"]}>
            <span className={styles["bs-input-icon"]}>✉</span>
            <input className={styles["bs-input"]} name="email" type="email"
              placeholder="Enter your email" value={form.email} onChange={handleChange} />
          </div>
        </div>

        {/* Phone */}
        <div className={styles["bs-field"]}>
          <label className={styles["bs-label"]}>Phone Number</label>
          <div className={styles["bs-input-wrap"]}>
            <span className={styles["bs-input-icon"]}>📞</span>
            <input className={styles["bs-input"]} name="phone" type="tel"
              placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
          </div>
        </div>

        {/* Service */}
        <div className={styles["bs-field"]}>
          <label className={styles["bs-label"]}>Service</label>
          <div
            className={`${styles["bs-select-trigger"]} ${serviceOpen ? styles["open"] : ""}`}
            onClick={() => { setServiceOpen(!serviceOpen); setProgramOpen(false); }}
          >
            <span className={`${styles["bs-select-val"]} ${!form.service ? styles["placeholder"] : ""}`}>
              {selectedService ? selectedService.label : "Select Service"}
            </span>
            <span className={`${styles["bs-chevron"]} ${serviceOpen ? styles["up"] : ""}`}>▾</span>
          </div>
          {serviceOpen && (
            <div className={styles["bs-dropdown"]}>
              {SERVICES.map((service) => (
                <div key={service.id}
                  className={`${styles["bs-dropdown-item"]} ${form.service === service.id ? styles["active"] : ""}`}
                  onClick={() => selectService(service.id)}>
                  <span className={styles["bs-dd-icon"]}>{service.icon}</span>
                  <div className={styles["bs-dd-text"]}>
                    <span className={styles["bs-dd-label"]}>{service.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Program Type */}
        <div className={styles["bs-field"]}>
          <label className={styles["bs-label"]}>Program Type</label>
          <div
            className={`${styles["bs-select-trigger"]} ${programOpen ? styles["open"] : ""}`}
            onClick={() => { setProgramOpen(!programOpen); setServiceOpen(false); }}
          >
            <span className={`${styles["bs-select-val"]} ${!form.program ? styles["placeholder"] : ""}`}>
              {selectedProg ? selectedProg.shortLabel : "Select Program"}
            </span>
            <span className={`${styles["bs-chevron"]} ${programOpen ? styles["up"] : ""}`}>▾</span>
          </div>
          {programOpen && (
            <div className={styles["bs-dropdown"]}>
              {PROGRAMS.map((prog) => (
                <div key={prog.id}
                  className={`${styles["bs-dropdown-item"]} ${form.program === prog.id ? styles["active"] : ""}`}
                  onClick={() => selectProgram(prog.id)}>
                  <div className={styles["bs-dd-text"]}>
                    <span className={styles["bs-dd-label"]}>{prog.label}</span>
                    <div className={styles.ddPriceRow}>
                      <span className={styles.ddPrice}>{prog.price.replace('₹', '')}</span>
                      {prog.originalPrice && <span className={styles.ddOrig}>{prog.originalPrice.replace('₹', '')}</span>}
                    </div>
                    <span className={styles["bs-dd-subtitle"]}>{prog.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Time Selection */}
        <div className={styles["bs-field"]}>
          <div className={styles.timeLabelRow}>
            <label className={styles["bs-label"]}>Select Time</label>
            <span className={styles.tzBadge}>🕐 IST</span>
          </div>
          <div className={styles["bs-time-select-wrap"]}>
            <select
              name="preferredTime"
              value={form.preferredTime}
              onChange={handleChange}
              className={styles["bs-time-select"]}
            >
              <option value="" disabled>
                Select Time
              </option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <span className={styles["bs-select-arrow"]}>▾</span>
          </div>
        </div>

        {errorMsg && <div className={styles["bs-error"]}>{errorMsg}</div>}

        <button
          className={`${styles["bs-submit"]} ${status === "loading" ? styles["loading"] : ""}`}
          onClick={handleSubmit} disabled={status === "loading"} type="button">
          {status === "loading" ? <span className={styles["bs-spinner"]} /> : "BOOK MY SESSION →"}
        </button>

        <p className={styles["bs-footer-note"]}>
          ✓ You'll receive a confirmation via email.
        </p>

        {/* Group Classes Banner */}
        <div className={styles["bs-group-banner"]}>
          <img
            src={groupClassesImg}
            alt="Limited Seats for Group Classes"
            className={styles["bs-group-banner-img"]}
          />
        </div>
      </div>
    </>
  );

  /* ─── SUCCESS POPUP MODAL ─── */
  const SuccessPopup = () => (
    <>
      {showSuccessPopup && (
        <>
          {/* Overlay */}
          <div
            className={styles["bs-popup-overlay"]}
            onClick={handleReset}
          />
          {/* Modal */}
          <div className={styles["bs-popup-modal"]}>
            <div className={styles["bs-popup-content"]}>
              <div className={styles["bs-popup-icon"]}>✓</div>
              <h2 className={styles["bs-popup-title"]}>BOOKING CONFIRMED!</h2>
              <p className={styles["bs-popup-msg"]}>
                Your session has been booked successfully!
              </p>
              <div className={styles["bs-popup-detail"]}>
                {selectedService && <span><strong>Service:</strong> {selectedService.label}</span>}
                <span><strong>Program:</strong> {selectedProg?.label}</span>
                <span><strong>Time:</strong> {form.preferredTime}</span>
                <span><strong>Name:</strong> {form.fullName}</span>
              </div>
              <p className={styles["bs-popup-email"]}>
                Confirmation email sent to <strong>{form.email}</strong>
              </p>
              <button className={styles["bs-popup-btn"]} onClick={handleReset}>
                BOOK ANOTHER SESSION →
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );

  if (embedded) {
    return (
      <div className={styles["bs-page"]}>
        <SuccessPopup />
        <div className={styles["bs-right"]}>{FormContent}</div>
      </div>
    );
  }

  return (
    <div className={styles["bs-page"]}>
      <SuccessPopup />
      <main className={styles["bs-main"]}>
        {/* LEFT: Program Cards */}
        <div className={styles["bs-left"]}>
          {LeftPanel}
        </div>

        {/* RIGHT: Booking Form */}
        <div className={styles["bs-right"]}>
          {FormContent}
        </div>
      </main>

      <footer className={styles["bs-footer"]}>
        {FOOTER_BADGES.map((b) => (
          <div key={b.title} className={styles["bs-badge"]}>
            <span className={styles["bs-badge-icon"]}>{b.icon}</span>
            <div className={styles["bs-badge-text"]}>
              <span className={styles["bs-badge-title"]}>{b.title}</span>
              <span className={styles["bs-badge-desc"]}>{b.desc}</span>
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
}