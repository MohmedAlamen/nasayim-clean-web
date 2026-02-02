import { describe, expect, it } from "vitest";

describe("Shopping Cart System", () => {
  it("should add items to cart", () => {
    const cart: any[] = [];
    
    const addItem = (item: any) => {
      cart.push(item);
    };

    addItem({ id: "1", name: "Service 1", price: 500, quantity: 1 });
    expect(cart.length).toBe(1);
    expect(cart[0].price).toBe(500);
  });

  it("should update item quantity", () => {
    const cart = [{ id: "1", name: "Service 1", price: 500, quantity: 1 }];
    
    const updateQuantity = (id: string, qty: number) => {
      const item = cart.find(i => i.id === id);
      if (item) item.quantity = qty;
    };

    updateQuantity("1", 3);
    expect(cart[0].quantity).toBe(3);
  });

  it("should remove items from cart", () => {
    const cart = [
      { id: "1", name: "Service 1", price: 500, quantity: 1 },
      { id: "2", name: "Service 2", price: 800, quantity: 1 }
    ];
    
    const removeItem = (id: string) => {
      const index = cart.findIndex(i => i.id === id);
      if (index > -1) cart.splice(index, 1);
    };

    removeItem("1");
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe("2");
  });

  it("should calculate cart total", () => {
    const cart = [
      { id: "1", name: "Service 1", price: 500, quantity: 2 },
      { id: "2", name: "Service 2", price: 800, quantity: 1 }
    ];
    
    const getTotal = () => {
      return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    expect(getTotal()).toBe(1800);
  });

  it("should apply coupon discount", () => {
    const coupons: Record<string, number> = {
      "WELCOME10": 10,
      "SAVE20": 20,
    };

    const applyCoupon = (code: string) => {
      return coupons[code.toUpperCase()] || 0;
    };

    expect(applyCoupon("WELCOME10")).toBe(10);
    expect(applyCoupon("SAVE20")).toBe(20);
    expect(applyCoupon("INVALID")).toBe(0);
  });

  it("should calculate total with discount", () => {
    const subtotal = 1000;
    const discountPercent = 20;
    
    const calculateWithDiscount = (sub: number, discount: number) => {
      return sub * (1 - discount / 100);
    };

    expect(calculateWithDiscount(subtotal, discountPercent)).toBe(800);
  });

  it("should calculate tax", () => {
    const amount = 1000;
    const taxRate = 0.05;
    
    const calculateTax = (amt: number, rate: number) => {
      return amt * rate;
    };

    expect(calculateTax(amount, taxRate)).toBe(50);
  });

  it("should persist cart to localStorage", () => {
    const cart = [{ id: "1", name: "Service 1", price: 500, quantity: 1 }];
    
    const saveCart = (items: any[]) => {
      localStorage.setItem("nasayim-cart", JSON.stringify(items));
    };

    const loadCart = () => {
      const saved = localStorage.getItem("nasayim-cart");
      return saved ? JSON.parse(saved) : [];
    };

    saveCart(cart);
    const loaded = loadCart();
    
    expect(loaded.length).toBe(1);
    expect(loaded[0].id).toBe("1");
  });
});
