import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ onBookTrial }) {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Logo */}
          <div className={styles.logoSection}>
            <div className={styles.logoWrap}>
              <img src="/images/logo.jpg" alt="BA Logo" className={styles.logoImage} />
            </div>
          </div>

          {/* Contact */}
          <div className={styles.contactSection}>
            <h3>Contact Us</h3>
            <p>📧 boxingavenueofficial@gmail.com</p>
            <p>📱 +91 9307065559</p>
          </div>

          {/* Address */}
          <div className={styles.addressSection}>
            <h3>Address</h3>
            <p>Boxing Avenue</p>
            <p>3rd Floor, above ALPHA FIT gym</p>
            <p>Dharampeth Square, Gorepeth</p>
            <p>Nagpur, Maharashtra 440010</p>
          </div>

          {/* Social */}
          <div className={styles.socialSection}>
            <h3>FOLLOW ME</h3>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/boxing.ave?igsh=MTJjZjZwYmdwMmRxcw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram" className={`${styles.socialBtn} ${styles.instagram}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12c0-3.403 2.759-6.162 6.162-6.162 3.403 0 6.162 2.759 6.162 6.162 0 3.403-2.759 6.162-6.162 6.162-3.403 0-6.162-2.759-6.162-6.162zm1.622 0c0 2.506 2.034 4.54 4.54 4.54 2.506 0 4.54-2.034 4.54-4.54 0-2.506-2.034-4.54-4.54-4.54-2.506 0-4.54 2.034-4.54 4.54zm11.157-7.472c0 .795.645 1.44 1.44 1.44.795 0 1.44-.645 1.44-1.44-.001-.795-.645-1.44-1.44-1.44-.795 0-1.44.645-1.44 1.44z"/>
                </svg>
              </a>

              <a href="https://www.youtube.com/@Boxingavenue" target="_blank" rel="noreferrer" aria-label="YouTube" className={`${styles.socialBtn} ${styles.youtube}`}>
                <svg width="18" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.58A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.8.58 9.4.58 9.4.58s7.6 0 9.4-.58a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" fill="currentColor"/>
                </svg>
              </a>

              <a href="https://wa.link/jgzjnw" target="_blank" rel="noreferrer" aria-label="WhatsApp" className={`${styles.socialBtn} ${styles.whatsapp}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.13.648 4.116 1.754 5.789L.5 24l6.516-2.084A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.96c-1.896 0-3.744-.431-5.411-1.204l-.388-.191-4.018 1.285.984-3.595-.243-.386A9.955 9.955 0 0 1 2.04 12c0-5.515 4.495-10.01 10.01-10.01 5.515 0 10.01 4.495 10.01 10.01-2.223e-15 5.515-4.495 10.01-10.01 10.01z"/>
                  <path d="M8.322 7.614c-.139-.31-.285-.309-.468-.314-.121-.003-.26-.004-.398-.004-.137 0-.364.052-.556.256-.192.204-.734.717-.734 1.75 0 1.032.751 2.03.856 2.169.104.138 1.485 2.268 3.595 3.182 2.11.914 2.11.609 2.49.571.38-.038 1.224-.5 1.395-1.037.171-.536.171-.995.12-1.094-.052-.1-.19-.16-.397-.28-.206-.122-1.224-.604-1.414-.672-.19-.069-.329-.103-.466.103-.137.207-.53.671-.65.809-.12.138-.24.154-.447.052-.206-.103-871-.32-1.66-.102-1.66-.026 0-.51.504-.583.602-.073.098-.148.111-.354.037-.206-.074-.774-.285-.975-.568-.2-.283-.335-.632-.373-.788.039-.157.103-.251.207-.331z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>© 2026 BA Training. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
