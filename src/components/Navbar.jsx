import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar({ onBookTrial }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden]     = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY             = useRef(0);
  const navigate                = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastScrollY.current && y > 100);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navLinks = [
    { name: 'Home',       id: 'home' },
    { name: 'Services',   id: 'services' },
    { name: 'Coaches',    id: 'Coaches' },
    { name: 'Fightstore', id: 'Fightstore' },
    { name: 'Contact',    id: 'contact' },
  ];

  const handleNavClick = (id) => {
    setMenuOpen(false);
    navigate('/');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBook = () => { setMenuOpen(false); onBookTrial(); };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.navInner}>

        {/* Logo */}
        <div className={styles.logo}>
          <img src="/images/logo.jpg" alt="Boxing Avenue" className={styles.navLogoImage} />
        </div>

        {/* Nav links — desktop horizontal, mobile drawer */}
        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <button onClick={() => handleNavClick(link.id)}>{link.name}</button>
            </li>
          ))}

          {/* These items only appear on mobile inside the drawer */}
          <li className={styles.mobileCtaRow}>
            <button className={styles.mobileBookBtn} onClick={handleBook}>BOOK A SESSION</button>
            <Link to="/login" className={styles.mobileAdminLink} onClick={() => setMenuOpen(false)}>Admin</Link>
          </li>
        </ul>

        {/* Desktop-only CTA buttons */}
        <div className={styles.ctaGroup}>
          <button className={styles.ctaBtn} onClick={onBookTrial}>BOOK A SESSION</button>
          <Link to="/login" className={styles.adminBtn}>Admin</Link>
        </div>

        {/* Hamburger */}
        <button className={styles.hamburger} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span className={menuOpen ? styles.bar1Open : styles.bar} />
          <span className={menuOpen ? styles.bar2Open : styles.bar} />
          <span className={menuOpen ? styles.bar3Open : styles.bar} />
        </button>

      </div>
    </nav>
  );
}
