import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isVeg: boolean;
  isNew?: boolean;
  isHot?: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  loyaltyPoints: number;
  membershipTier: 'silver' | 'gold' | 'platinum';
  savedAddresses: Address[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  zipCode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  tax: number;
  deliveryCharge: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered';
  createdAt: Date;
  estimatedDelivery: Date;
  deliveryAddress?: Address;
  paymentMethod: 'cash' | 'card' | 'upi';
}

export interface Reservation {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: Date;
  time: string;
  specialRequest?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface AppStore {
  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;

  // User
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Wishlist
  wishlist: string[];
  addToWishlist: (itemId: string) => void;
  removeFromWishlist: (itemId: string) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Preferences
  currency: string;
  language: string;
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item: MenuItem) => {
        set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }
          return {
            cart: [...state.cart, { ...item, quantity: 1 }],
          };
        });
      },
      removeFromCart: (itemId: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        }));
      },
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
      cartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      user: null,
      isLoggedIn: false,
      login: (user: User) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false, cart: [] }),
      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      orders: [],
      addOrder: (order: Order) => {
        set((state) => ({
          orders: [...state.orders, order],
          cart: [],
        }));
      },
      updateOrderStatus: (orderId: string, status: Order['status']) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },

      wishlist: [],
      addToWishlist: (itemId: string) => {
        set((state) => ({
          wishlist: state.wishlist.includes(itemId)
            ? state.wishlist
            : [...state.wishlist, itemId],
        }));
      },
      removeFromWishlist: (itemId: string) => {
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== itemId),
        }));
      },

      theme: 'light',
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        }));
      },

      currency: 'INR',
      language: 'en',
    }),
    {
      name: 'brew-haven-store',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        orders: state.orders,
        wishlist: state.wishlist,
        theme: state.theme,
      }),
    }
  )
);
