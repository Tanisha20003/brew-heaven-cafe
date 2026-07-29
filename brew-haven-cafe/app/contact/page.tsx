'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import styles from '@/styles/contact.module.css';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <section className={styles.contact}>
        <div className="container">
          <h1>Contact Us</h1>
          <p className={styles.subtitle}>We'd love to hear from you</p>

          <div className={styles.grid}>
            {/* Contact Info */}
            <div className={styles.info}>
              <div className={styles.infoCard}>
                <FiMapPin size={32} className={styles.icon} />
                <h3>Address</h3>
                <p>Sector 12, Ambala, Haryana 134003</p>
              </div>

              <div className={styles.infoCard}>
                <FiPhone size={32} className={styles.icon} />
                <h3>Phone</h3>
                <a href="tel:+919876543210">+91 9876 543 210</a>
              </div>

              <div className={styles.infoCard}>
                <FiMail size={32} className={styles.icon} />
                <h3>Email</h3>
                <a href="mailto:hello@brewhaven.in">hello@brewhaven.in</a>
              </div>

              <div className={styles.infoCard}>
                <FiClock size={32} className={styles.icon} />
                <h3>Hours</h3>
                <p>Mon-Thu: 9 AM - 11 PM</p>
                <p>Fri-Sat: 9 AM - 12 AM</p>
                <p>Sun: 8 AM - 11 PM</p>
              </div>
            </div>

            {/* Contact Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg">
                Send Message
              </button>
            </form>
          </div>

          {/* Map Placeholder */}
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <p>📍 Google Maps Integration</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
