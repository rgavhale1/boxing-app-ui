import React from 'react';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "Best decision I've made. Training is challenging, effective and actually fun.",
      author: 'ROHIT S.',
      title: 'Client',
      avatar: 'RS'
    },
    {
      id: 2,
      quote: "I've never felt stronger or more confident. Highly recommended BA Training!",
      author: 'AISHWARYA K.',
      title: 'Client',
      avatar: 'AK'
    },
    {
      id: 3,
      quote: 'Personalized approach and amazing results. Worth every session.',
      author: 'KUNAL M.',
      title: 'Client',
      avatar: 'KM'
    }
  ];

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.container}>
        <h2 className={styles.title}>WHAT CLIENTS SAY</h2>
        
        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.card}>
              <div className={styles.quote}>"{testimonial.quote}"</div>
              
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.avatar}
                </div>
                <div className={styles.authorInfo}>
                  <p className={styles.authorName}>{testimonial.author}</p>
                  <p className={styles.authorTitle}>{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
