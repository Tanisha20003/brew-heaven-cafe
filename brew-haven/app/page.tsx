'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { menuItems, testimonials, specialOffers, businessHours } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import styles from '@/styles/home.module.css';

export default function Home() {
  const { addToCart } = useStore();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredItems = menuItems.slice(0, 6);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <div className={styles.scrollProgress} style={{ width: `${scrollProgress}%` }} />
      <Navbar />
      <Hero />

      {/* About Section */}
      <section className={`section ${styles.about}`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <motion.div
              className={styles.aboutContent}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Our Story</h2>
              <p>
                Brew Haven Café was born from a passion for exceptional coffee and handcrafted food.
                We believe that every sip and every bite should be memorable. Our cafe combines the
                warmth of traditional hospitality with modern luxury.
              </p>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    50K+
                  </motion.h3>
                  <p>Happy Customers</p>
                </div>
                <div className={styles.stat}>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    100K+
                  </motion.h3>
                  <p>Orders Served</p>
                </div>
                <div className={styles.stat}>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    5 Yrs
                  </motion.h3>
                  <p>Experience</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className={styles.aboutImage}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/1121100/pexels-photo-1121100.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop"
                alt="Brew Haven Café Interior"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`section ${styles.whyChoose}`}>
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Brew Haven</h2>
            <p>Experience the perfect blend of quality, comfort, and sustainability</p>
          </div>
          <motion.div
            className="grid grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: '☕', title: 'Premium Coffee', desc: 'Sourced from finest arabica beans' },
              { icon: '🥟', title: 'Handcrafted Momos', desc: 'Made fresh daily with love' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Quick service without compromising quality' },
              { icon: '📶', title: 'Free WiFi', desc: 'High-speed internet for work or leisure' },
              { icon: '🪴', title: 'Eco Friendly', desc: 'Sustainable practices throughout' },
              { icon: '🎵', title: 'Live Music', desc: 'Enjoy sounds of talented musicians' },
            ].map((item, idx) => (
              <motion.div key={idx} className={styles.whyCard} variants={itemVariants}>
                <div className={styles.whyIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className={`section ${styles.featured}`}>
        <div className="container">
          <div className="section-title">
            <h2>Featured Menu</h2>
            <p>Handpicked favorites from our premium selection</p>
          </div>
          <motion.div
            className="grid grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredItems.map((item) => (
              <motion.div key={item.id} className={styles.menuCard} variants={itemVariants}>
                <div className={styles.cardImage}>
                  <img src={item.image} alt={item.name} />
                  {item.isNew && <span className="badge badge-new">New</span>}
                  {item.isHot && <span className="badge badge-hot">Hot</span>}
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3>{item.name}</h3>
                    <span className={item.isVeg ? 'badge badge-veg' : 'badge badge-non-veg'}>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                  <p className={styles.description}>{item.description}</p>
                  <div className={styles.cardFooter}>
                    <div>
                      <span className={styles.price}>₹{item.price}</span>
                      {item.rating && (
                        <span className={styles.rating}>
                          ⭐ {item.rating} ({item.reviews})
                        </span>
                      )}
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center" style={{ marginTop: 'var(--spacing-2xl)' }}>
            <Link href="/menu" className="btn btn-primary btn-lg">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className={`section ${styles.offers}`}>
        <div className="container">
          <div className="section-title">
            <h2>Today's Specials</h2>
            <p>Don't miss out on our exclusive offers</p>
          </div>
          <motion.div
            className="grid grid-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {specialOffers.map((offer) => (
              <motion.div key={offer.id} className={styles.offerCard} variants={itemVariants}>
                <div className={styles.offerBadge}>{offer.discount}% OFF</div>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <button className="btn btn-primary">Claim Offer</button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section ${styles.testimonials}`}>
        <div className="container">
          <div className="section-title">
            <h2>What Our Customers Say</h2>
            <p>Real experiences from real people</p>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((review) => (
              <motion.div
                key={review.id}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={styles.rating}>{'⭐'.repeat(review.rating)}</div>
                <p className={styles.review}>"{review.review}"</p>
                <div className={styles.author}>
                  <img src={review.image} alt={review.name} />
                  <div>
                    <p className={styles.name}>{review.name}</p>
                    {review.verified && <p className={styles.verified}>✓ Verified Customer</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className={`section ${styles.hours}`}>
        <div className="container">
          <div className="section-title">
            <h2>Opening Hours</h2>
            <p>Visit us during your convenient time</p>
          </div>
          <div className={styles.hoursGrid}>
            {businessHours.map((hour) => (
              <div key={hour.day} className={styles.hourItem}>
                <p className={styles.day}>{hour.day}</p>
                <p className={styles.time}>
                  {hour.open} - {hour.close}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
