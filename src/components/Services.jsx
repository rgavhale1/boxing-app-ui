import React from 'react';
import styles from './Services.module.css';
import {
  UserRound,
  ClipboardList,
  Shield,
  Dumbbell,
} from "lucide-react";

const services = [
  {
    icon: <UserRound size={40} strokeWidth={1.5} />,
    title: '1-ON-1 COACHING',
    desc: 'Personalized workouts designed around your goals and lifestyle.',
  },
  {
    icon: <ClipboardList size={40} strokeWidth={1.5} />,
    title: 'CUSTOM WORKOUT/DIET PLAN',
    desc: 'Tailored fitness and nutrition programs built to match your unique needs.',
  },
  {
    icon: <Dumbbell size={40} strokeWidth={1.5} />,
    title: 'BOXING',
    desc: 'Master boxing techniques, improve agility, and build fighting spirit.',
  },
  {
    icon: <Shield size={40} strokeWidth={1.5} />,
    title: 'MUAY THAI',
    desc: 'Train in the art of Muay Thai to enhance strength, discipline, and striking skills.',
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.sectionTag}>TRAINING SERVICES</div>
        <div className={styles.grid}>
          {services.map((s, i) => (
            <div key={i} className={styles.card} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className={styles.iconWrap} style={{ borderColor: s.accent }}>
                <span className={styles.icon}>{s.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={styles.cardLine} style={{ background: s.accent }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}