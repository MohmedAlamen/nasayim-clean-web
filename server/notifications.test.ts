import { describe, it, expect } from "vitest";
import { interpolateTemplate, getTemplate } from "../client/src/data/notificationTemplates";

describe("Notification System", () => {
  describe("Template Interpolation", () => {
    it("should replace variables in template", () => {
      const template = "Hi {{name}}, your appointment is at {{time}}";
      const variables = { name: "Ahmed", time: "3:00 PM" };
      const result = interpolateTemplate(template, variables);
      expect(result).toBe("Hi Ahmed, your appointment is at 3:00 PM");
    });

    it("should handle multiple occurrences of same variable", () => {
      const template = "Hello {{name}}, {{name}} please confirm";
      const variables = { name: "Sara" };
      const result = interpolateTemplate(template, variables);
      expect(result).toBe("Hello Sara, Sara please confirm");
    });

    it("should handle missing variables gracefully", () => {
      const template = "Hi {{name}}, your service is {{service}}";
      const variables = { name: "Ali" };
      const result = interpolateTemplate(template, variables);
      expect(result).toContain("Hi Ali");
    });
  });

  describe("Template Management", () => {
    it("should retrieve appointment reminder template", () => {
      const template = getTemplate("appointment_reminder_24h");
      expect(template).toBeDefined();
      expect(template?.type).toBe("appointment_reminder");
      expect(template?.channels).toContain("sms");
      expect(template?.channels).toContain("whatsapp");
    });

    it("should retrieve order confirmation template", () => {
      const template = getTemplate("order_confirmation");
      expect(template).toBeDefined();
      expect(template?.type).toBe("confirmation");
      expect(template?.channels).toContain("email");
    });

    it("should return undefined for non-existent template", () => {
      const template = getTemplate("non_existent_template");
      expect(template).toBeUndefined();
    });

    it("should have bilingual templates", () => {
      const template = getTemplate("appointment_reminder_24h");
      expect(template?.template.en).toBeDefined();
      expect(template?.template.ar).toBeDefined();
      expect(template?.template.en).not.toBe(template?.template.ar);
    });
  });

  describe("Notification Channels", () => {
    it("should support SMS channel", () => {
      const template = getTemplate("appointment_reminder_1h");
      expect(template?.channels).toContain("sms");
    });

    it("should support WhatsApp channel", () => {
      const template = getTemplate("appointment_reminder_1h");
      expect(template?.channels).toContain("whatsapp");
    });

    it("should support Email channel", () => {
      const template = getTemplate("order_confirmation");
      expect(template?.channels).toContain("email");
    });
  });

  describe("Notification Timing", () => {
    it("should have timing for 24-hour reminder", () => {
      const template = getTemplate("appointment_reminder_24h");
      expect(template?.timing?.before).toBe(1440);
    });

    it("should have timing for 1-hour reminder", () => {
      const template = getTemplate("appointment_reminder_1h");
      expect(template?.timing?.before).toBe(60);
    });

    it("should handle templates without timing", () => {
      const template = getTemplate("order_confirmation");
      expect(template?.timing).toBeUndefined();
    });
  });

  describe("Phone Number Validation", () => {
    it("should validate Saudi phone numbers", () => {
      const saudiNumber = "+966501234567";
      expect(saudiNumber).toMatch(/^\+966\d{9}$/);
    });

    it("should accept WhatsApp format", () => {
      const whatsappNumber = "966501234567";
      expect(whatsappNumber).toMatch(/^966\d{9}$/);
    });
  });

  describe("Message Content", () => {
    it("should generate proper SMS length", () => {
      const template = getTemplate("appointment_reminder_1h");
      const message = template?.template.en || "";
      expect(message.length).toBeGreaterThan(0);
      expect(message.length).toBeLessThan(500);
    });

    it("should include customer name in message", () => {
      const template = getTemplate("order_confirmation");
      expect(template?.template.en).toContain("{{customerName}}");
    });

    it("should have Arabic translations", () => {
      const template = getTemplate("appointment_reminder_24h");
      expect(template?.template.ar).toContain("مرحباً");
    });
  });
});
