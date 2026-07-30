'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { menuItems } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import { FiSearch, FiFilter } from 'react-icons/fi';
import styles from '@/styles/menu.module.css';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useStore();

  const categories = ['All', ...new Set(menuItems.map((item) => item.category))];

  const filteredItems = menuItems.filter((item) => {
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Navbar />
      <section className={styles.menu}>
        <div className="container">
          <h1 className={styles.title}>Our Menu</h1>
          <p className={styles.subtitle}>Browse our delicious selection</p>

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <FiSearch size={20} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className={styles.categories}>
            <FiFilter size={20} />
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category ? styles.active : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <motion.div
            className={styles.menuGrid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div key={item.id} className={styles.menuCard} variants={itemVariants}>
                  <div className={styles.cardImage}>
                    <img src={item.image} alt={item.name} />
                    <div className={styles.badges}>
                      {item.isNew && <span className="badge badge-new">New</span>}
                      {item.isHot && <span className="badge badge-hot">Hot</span>}
                      <span className={item.isVeg ? 'badge badge-veg' : 'badge badge-non-veg'}>
                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{item.name}</h3>
                    <p className={styles.category}>{item.category}</p>
                    <p className={styles.description}>{item.description}</p>
                    <div className={styles.rating}>
                      {item.rating && (
                        <>
                          <span>⭐ {item.rating}</span>
                          <span className={styles.reviews}>({item.reviews} reviews)</span>
                        </>
                      )}
                    </div>
                    <div className={styles.footer}>
                      <span className={styles.price}>₹{item.price}</span>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No items found. Try adjusting your search.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
