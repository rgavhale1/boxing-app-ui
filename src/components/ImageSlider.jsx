import React, { useState } from 'react';
import styles from './ImageSlider.module.css';

export default function ImageSlider({ slides = [] }) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const next = () =>
    setCurrent((c) => (c + 1) % slides.length);

  if (!slides.length) return null;

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider} aria-roledescription="carousel">
        {slides.map((s, i) => (
          <img
            key={s.id}
            src={s.src}
            alt={s.alt}
            className={styles.slideImage}
            style={{ display: i === current ? 'block' : 'none' }}
          />
        ))}

        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={prev}
          aria-label="Previous"
        >
          ‹
        </button>

        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={next}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <div className={styles.dotsContainer}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}