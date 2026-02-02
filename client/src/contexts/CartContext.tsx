import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  nameEn: string;
  nameAr: string;
  price: number;
  quantity: number;
  duration: string;
  category: "cleaning" | "pest" | "sanitization";
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountCode: string | null;
  discountPercent: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("nasayim-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("nasayim-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode(null);
    setDiscountPercent(0);
  };

  const getTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = (subtotal * discountPercent) / 100;
    return Math.max(0, subtotal - discount);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const applyCoupon = (code: string): boolean => {
    // Simple coupon validation - in production, this would call a backend API
    const coupons: Record<string, number> = {
      "WELCOME10": 10,
      "SAVE20": 20,
      "NASAYIM15": 15,
    };

    if (coupons[code.toUpperCase()]) {
      setDiscountCode(code.toUpperCase());
      setDiscountPercent(coupons[code.toUpperCase()]);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setDiscountCode(null);
    setDiscountPercent(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
        applyCoupon,
        removeCoupon,
        discountCode,
        discountPercent,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
