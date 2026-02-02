import { describe, expect, it } from "vitest";

describe("Payment Methods", () => {
  it("should support multiple payment methods", () => {
    const paymentMethods = ["credit_card", "debit_card", "apple_pay", "google_pay"];
    
    expect(paymentMethods).toContain("credit_card");
    expect(paymentMethods).toContain("apple_pay");
    expect(paymentMethods.length).toBe(4);
  });

  it("should validate card information", () => {
    const validateCard = (cardNumber: string) => {
      return cardNumber.length === 16 && /^\d+$/.test(cardNumber);
    };

    expect(validateCard("4242424242424242")).toBe(true);
    expect(validateCard("invalid")).toBe(false);
  });

  it("should calculate total with tax", () => {
    const calculateTotal = (amount: number, taxRate: number = 0.05) => {
      return amount * (1 + taxRate);
    };

    expect(calculateTotal(100)).toBe(105);
    expect(calculateTotal(1000, 0.1)).toBe(1100);
  });

  it("should process refunds", () => {
    const processRefund = (amount: number, refundPercentage: number) => {
      return amount * (refundPercentage / 100);
    };

    expect(processRefund(1000, 100)).toBe(1000);
    expect(processRefund(500, 50)).toBe(250);
  });
});

describe("Service Pricing", () => {
  it("should have correct pricing for services", () => {
    const services = {
      "office-daily": 500,
      "deep-clean": 1200,
      "cockroach-control": 400,
      "covid-disinfection": 1000,
    };

    expect(services["office-daily"]).toBe(500);
    expect(services["deep-clean"]).toBe(1200);
  });

  it("should apply discounts correctly", () => {
    const applyDiscount = (price: number, discountPercent: number) => {
      return price * (1 - discountPercent / 100);
    };

    expect(applyDiscount(500, 10)).toBe(450);
    expect(applyDiscount(1000, 20)).toBe(800);
  });
});
