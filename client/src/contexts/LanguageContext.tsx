import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Staff Login",
    "home.hero.title": "Your Trusted Partner for",
    "home.hero.subtitle": "Cleaning & Pest Control",
    "home.hero.description": "Professional cleaning and pest control services that keep your spaces fresh, clean, and pest-free. Serving businesses and homes with excellence.",
    "home.cta.book": "Book Service Now",
    "home.cta.services": "View Services",
    "home.services.title": "Our Services",
    "home.services.description": "Comprehensive cleaning and pest control solutions tailored to your needs",
    "home.why.title": "Why NASAYIM CLEAN",
    "home.why.description": "We're committed to delivering exceptional service quality",
    "home.cta.ready": "Ready to Get Started?",
    "home.cta.quote": "Get Free Quote",
    "home.cta.whatsapp": "WhatsApp Us",
    "services.title": "Our Services",
    "services.description": "Comprehensive cleaning and pest control solutions for every need",
    "about.title": "About NASAYIM CLEAN",
    "about.description": "Your trusted partner for professional cleaning and pest control services",
    "about.story": "Our Story",
    "contact.title": "Contact Us",
    "contact.description": "Get in touch with us for inquiries, bookings, or support",
    "contact.info": "Contact Information",
    "contact.message": "Send us a Message",
    "login.title": "Staff Login",
    "login.description": "Sign in to access the NASAYIM CLEAN dashboard",
    "footer.copyright": "© 2026 NASAYIM CLEAN. All rights reserved.",
  },
  ar: {
    "nav.services": "الخدمات",
    "nav.about": "عن الشركة",
    "nav.contact": "اتصل بنا",
    "nav.login": "دخول الموظفين",
    "home.hero.title": "شريكك الموثوق لـ",
    "home.hero.subtitle": "التنظيف ومكافحة الآفات",
    "home.hero.description": "خدمات تنظيف واحترافية ومكافحة آفات تحافظ على مساحاتك نظيفة وخالية من الآفات. نخدم الشركات والمنازل بتميز.",
    "home.cta.book": "احجز الخدمة الآن",
    "home.cta.services": "عرض الخدمات",
    "home.services.title": "خدماتنا",
    "home.services.description": "حلول شاملة للتنظيف ومكافحة الآفات مصممة حسب احتياجاتك",
    "home.why.title": "لماذا نسائم كلين",
    "home.why.description": "نحن ملتزمون بتقديم خدمة عالية الجودة",
    "home.cta.ready": "هل أنت مستعد للبدء؟",
    "home.cta.quote": "احصل على عرض سعر مجاني",
    "home.cta.whatsapp": "تواصل عبر واتس آب",
    "services.title": "خدماتنا",
    "services.description": "حلول شاملة للتنظيف ومكافحة الآفات لكل احتياجاتك",
    "about.title": "عن نسائم كلين",
    "about.description": "شريكك الموثوق لخدمات التنظيف الاحترافية ومكافحة الآفات",
    "about.story": "قصتنا",
    "contact.title": "اتصل بنا",
    "contact.description": "تواصل معنا للاستفسارات والحجوزات أو الدعم",
    "contact.info": "معلومات الاتصال",
    "contact.message": "أرسل لنا رسالة",
    "login.title": "دخول الموظفين",
    "login.description": "سجل الدخول للوصول إلى لوحة تحكم نسائم كلين",
    "footer.copyright": "© 2026 نسائم كلين. جميع الحقوق محفوظة.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
