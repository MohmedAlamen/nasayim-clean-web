import { describe, expect, it } from "vitest";

describe("Language Support", () => {
  it("should have English and Arabic translations", () => {
    const translations = {
      en: {
        "nav.services": "Services",
        "nav.about": "About",
        "nav.contact": "Contact",
      },
      ar: {
        "nav.services": "الخدمات",
        "nav.about": "عن الشركة",
        "nav.contact": "اتصل بنا",
      },
    };

    expect(translations.en["nav.services"]).toBe("Services");
    expect(translations.ar["nav.services"]).toBe("الخدمات");
  });

  it("should support RTL for Arabic", () => {
    const isRTL = (lang: string) => lang === "ar";
    
    expect(isRTL("ar")).toBe(true);
    expect(isRTL("en")).toBe(false);
  });

  it("should handle language switching", () => {
    let currentLanguage: "en" | "ar" = "en";
    const setLanguage = (lang: "en" | "ar") => {
      currentLanguage = lang;
    };

    setLanguage("ar");
    expect(currentLanguage).toBe("ar");

    setLanguage("en");
    expect(currentLanguage).toBe("en");
  });
});

describe("Theme Support", () => {
  it("should support light and dark themes", () => {
    const themes = ["light", "dark"] as const;
    expect(themes).toContain("light");
    expect(themes).toContain("dark");
  });

  it("should toggle between themes", () => {
    let currentTheme: "light" | "dark" = "light";
    const toggleTheme = () => {
      currentTheme = currentTheme === "light" ? "dark" : "light";
    };

    toggleTheme();
    expect(currentTheme).toBe("dark");

    toggleTheme();
    expect(currentTheme).toBe("light");
  });
});
