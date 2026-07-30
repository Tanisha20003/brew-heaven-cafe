'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '@/styles/hero.module.css';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className={styles.hero}>
      <div
        className={styles.background}
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/1121100/pexels-photo-1121100.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop")',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      <div className={styles.overlay} />

      <motion.div
        className={`${styles.content} container`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className={styles.tag}>
          Welcome to Coffee Paradise ☕
        </motion.div>

        <motion.h1 variants={itemVariants} className={styles.title}>
          Brew Haven Café
        </motion.h1>

        <motion.p variants={itemVariants} className={styles.tagline}>
          "Where Every Sip & Every Bite Feels Like Home"
        </motion.p>

        <motion.div variants={itemVariants} className={styles.buttons}>
          <Link href="/menu" className="btn btn-primary btn-lg">
            Explore Menu
          </Link>
          <Link href="/reservations" className="btn btn-outline btn-lg">
            Reserve Table
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.icon}>☕</span>
            <span>Premium Coffee</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.icon}>🥟</span>
            <span>Handcrafted Momos</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.icon}>🌿</span>
            <span>Eco-Friendly</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.floatingCup}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ☕
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path
            d="M15 5v15M15 20l-5-5M15 20l5-5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
