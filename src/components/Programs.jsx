import React from 'react';
import styles from './Programs.module.css';
import ImageSlider from './ImageSlider';

export default function Programs({ onBookTrial }) {

  const slides = [
    { id: 1, src: '/images/image1.jpg', alt: 'Training Image 1' },
    { id: 2, src: '/images/image2.jpg', alt: 'Training Image 2' },
    { id: 3, src: '/images/image3.jpg', alt: 'Training Image 3' },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Boxing Avenue's hybrid training approach is on another level. I started with boxing and gradually progressed into Muay Thai, and the journey has built real confidence in me. The training is structured and focused—not just on fitness, but on actual fight preparation. If you're serious about learning and stepping into the ring, Boxing Avenue gives you that edge.",
      author: 'Aman Dhargave',
      title: 'Client',
      avatar: 'AD',
      rating: 5
    },
    {
      id: 2,
      quote: "Joining Boxing Avenue completely changed my mindset toward training. The coaches push you beyond basic workouts and help you develop real discipline, technique, and endurance. Every session feels purposeful, and the mix of boxing and Muay Thai keeps training intense, exciting, and highly effective. I've become stronger physically and mentally since starting here.",
      author: 'Komal Madavi',
      title: 'Client',
      avatar: 'KM',
      rating: 5
    },
    {
      id: 3,
      quote: "After training at Boxing Avenue, I understood how powerful hybrid combat training can be. Integrating wrestling with striking added a whole new dimension to my skills — from balance and movement to pressure fighting and defense. Every session pushes you to think like a complete fighter, not just a striker or grappler. The coaching and structure here truly set it apart.",
      author: 'Tarun Mehta',
      title: 'Client',
      avatar: 'TM',
      rating: 5
    },
    {
      id: 4,
      quote: "Boxing Avenue god level. The coaching is elite, the workouts are intense, and the atmosphere is built for real progress. This place is a game changer for anyone serious about their training.",
      author: 'Anurag Kopulwar',
      title: 'Client',
      avatar: 'AK',
      rating: 5
    }
  ];

  return (
    <section className={styles.programs} id="programs">
      <div className={styles.row}>
        <div className={styles.sliderColumn}>
          <div className={styles.sliderWrapper}>
            <div className={styles.sliderArea}>
              <ImageSlider slides={slides} />
            </div>

            <div className={styles.promoColumn}>
              <div className={styles.promoBanner}>
                <div className={styles.promoLogo}>BA</div>
                <div className={styles.goldDivider}></div>
                <div className={styles.promoText}>
                  <span className={styles.promoLabel}>ONLINE</span>
                  <h3 className={styles.promoTitle}>BREATHWORK</h3>
                </div>
                <div className={styles.promoArrow}>›</div>
              </div>
              <p className={styles.promoDescription}>
                Improve focus, oxygen efficiency, and recovery with guided breathwork designed to support powerful, lasting training results. Our sessions teach breathing patterns for better endurance, stress relief, and faster muscle recovery so you perform stronger both in and out of the gym.
              </p>
            </div>
          </div>

          <div className={styles.testimonialStrip}>
            <div className={styles.testTitleContainer}>
              <h1 className={styles.testTitle}>WHAT CLIENTS SAY</h1>
            </div>

            <div className={styles.testimonialRow}>
              {testimonials.map((t) => (
                <div key={t.id} className={styles.smallTestCard}>
                  <div className={styles.quoteWrapper}>
                    <span className={styles.quoteMark}>"</span>
                    <p className={styles.testQuote}>{t.quote}</p>
                  </div>

                  <div className={styles.clientInfo}>
                    <div className={styles.clientAvatar}>
                      {t.avatar}
                    </div>

                    <div>
                      <p className={styles.testAuthor}>{t.author}</p>
                      <span className={styles.clientRole}>{t.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}