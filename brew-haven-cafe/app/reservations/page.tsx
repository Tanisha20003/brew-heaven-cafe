'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { timeSlots } from '@/lib/mockData';
import styles from '@/styles/reservations.module.css';
import { toast } from 'react-toastify';

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    specialRequest: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Reservation confirmed! We look forward to your visit 🎉');
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: '2',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      specialRequest: '',
    });
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <>
      <Navbar />
      <section className={styles.reservations}>
        <div className="container">
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Reserve Your Table</h1>
            <p>Book your perfect moment at Brew Haven Café</p>
          </motion.div>

          <div className={styles.grid}>
            {/* Form */}
            <motion.form
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Number of Guests *</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, '8+'].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={minDate}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Preferred Time *</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Special Requests</label>
                <textarea
                  name="specialRequest"
                  value={formData.specialRequest}
                  onChange={handleChange}
                  placeholder="Any special occasions or dietary requirements?"
                  rows={4}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg">
                Confirm Reservation
              </button>
            </motion.form>

            {/* Info Cards */}
            <motion.div
              className={styles.info}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>⏰</div>
                <h3>Booking Details</h3>
                <p>Advance bookings recommended for weekend seatings. Same-day bookings available based on availability.</p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📍</div>
                <h3>Location</h3>
                <p>Sector 12, Ambala, Haryana</p>
                <p className={styles.smallText}>Direct access from main road</p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📞</div>
                <h3>Need Help?</h3>
                <p>
                  <a href="tel:+919876543210">+91 9876 543 210</a>
                </p>
                <p>
                  <a href="mailto:reserve@brewhaven.in">reserve@brewhaven.in</a>
                </p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>✨</div>
                <h3>Special Features</h3>
                <ul>
                  <li>✓ WiFi Available</li>
                  <li>✓ Live Music Nights</li>
                  <li>✓ Private Seating</li>
                  <li>✓ Outdoor Garden</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
