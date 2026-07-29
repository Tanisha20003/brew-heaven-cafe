'use client';

import Link from 'next/link';
import { FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.section}>
            <h4>About Brew Haven</h4>
            <p>
              Premium cafe experience with handcrafted momos and coffee, surrounded by nature-inspired
              luxury.
            </p>
            <div className={styles.social}>
              <a href="#" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="#" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="#" aria-label="Email">
                <FiMail size={20} />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="/menu">Menu</Link>
              </li>
              <li>
                <Link href="/offers">Offers</Link>
              </li>
              <li>
                <Link href="/reservations">Reservations</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="tel:+919876543210" className={styles.contact}>
                  <FiPhone size={16} />
                  +91 9876 543 210
                </a>
              </li>
              <li>
                <a href="mailto:hello@brewhaven.in" className={styles.contact}>
                  <FiMail size={16} />
                  hello@brewhaven.in
                </a>
              </li>
              <li>
                <span className={styles.contact}>
                  <FiMapPin size={16} />
                  Sector 12, Ambala, Haryana
                </span>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Newsletter</h4>
            <p>Subscribe for exclusive offers and updates</p>
            <div className={styles.newsletter}>
              <input type="email" placeholder="Your email" />
              <button className="btn btn-primary btn-sm">Subscribe</button>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Brew Haven Café. All rights reserved.</p>
          <div className={styles.links}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/refund">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
