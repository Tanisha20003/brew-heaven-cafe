'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import styles from '@/styles/cart.module.css';
import { toast } from 'react-toastify';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode === 'SAVE20') {
      setDiscount(0.2);
      toast.success('Coupon applied! 20% discount');
    } else if (couponCode === 'WELCOME10') {
      setDiscount(0.1);
      toast.success('Coupon applied! 10% discount');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const subtotal = cartTotal();
  const discountAmount = subtotal * discount;
  const tax = (subtotal - discountAmount) * 0.05;
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal - discountAmount + tax + deliveryCharge;

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <section className={styles.empty}>
          <div className="container text-center">
            <div className={styles.emptyIcon}>🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Add some delicious items to get started</p>
            <Link href="/menu" className="btn btn-primary btn-lg">
              Continue Shopping
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className={styles.cart}>
        <div className="container">
          <h1>Shopping Cart</h1>

          <div className={styles.grid}>
            {/* Cart Items */}
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <motion.div key={item.id} className={styles.cartItem} layout>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <p className={styles.category}>{item.category}</p>
                  </div>
                  <div className={styles.quantity}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={styles.qtyBtn}
                    >
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={styles.qtyBtn}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <div className={styles.price}>₹{(item.price * item.quantity).toFixed(2)}</div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.deleteBtn}
                  >
                    <FiTrash2 />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className={styles.summary}>
              <div className={styles.summaryCard}>
                <h3>Order Summary</h3>

                <div className={styles.coupon}>
                  <input
                    type="text"
                    placeholder="Coupon code (e.g., SAVE20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button className="btn btn-primary btn-sm" onClick={handleApplyCoupon}>
                    Apply
                  </button>
                </div>

                <div className={styles.details}>
                  <div className={styles.row}>
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className={styles.row}>
                      <span className={styles.discount}>Discount ({(discount * 100).toFixed(0)}%)</span>
                      <span className={styles.discount}>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className={styles.row}>
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className={styles.row}>
                    <span>Delivery Charge</span>
                    <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
                  </div>
                </div>

                <div className={styles.total}>
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <Link href="/checkout" className="btn btn-primary" style={{ width: '100%' }}>
                  Proceed to Checkout
                </Link>

                <Link href="/menu" className={styles.continueShopping}>
                  Continue Shopping
                </Link>
              </div>

              {/* Delivery Info */}
              <div className={styles.infoCard}>
                <h4>🚚 Free Delivery</h4>
                <p>Orders above ₹500 get free delivery</p>
              </div>

              <div className={styles.infoCard}>
                <h4>💳 Safe Payment</h4>
                <p>All payments are secured and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
