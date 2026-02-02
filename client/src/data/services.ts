export interface ServicePackage {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  currency: string;
  duration: string;
  features: { en: string; ar: string }[];
  category: "cleaning" | "pest" | "sanitization";
}

export const realServices: ServicePackage[] = [
  {
    id: "office-daily",
    nameEn: "Daily Office Cleaning",
    nameAr: "التنظيف اليومي للمكاتب",
    descriptionEn: "Professional daily cleaning for office spaces",
    descriptionAr: "تنظيف يومي احترافي للمكاتب",
    price: 500,
    currency: "AED",
    duration: "2-3 hours",
    category: "cleaning",
    features: [
      { en: "Desk cleaning", ar: "تنظيف المكاتب" },
      { en: "Floor cleaning", ar: "تنظيف الأرضيات" },
      { en: "Trash removal", ar: "إزالة القمامة" },
      { en: "Restroom sanitization", ar: "تعقيم دورات المياه" },
      { en: "Eco-friendly products", ar: "منتجات صديقة للبيئة" },
    ],
  },
  {
    id: "deep-clean",
    nameEn: "Deep Cleaning Service",
    nameAr: "خدمة التنظيف العميق",
    descriptionEn: "Comprehensive deep cleaning for homes and offices",
    descriptionAr: "تنظيف عميق شامل للمنازل والمكاتب",
    price: 1200,
    currency: "AED",
    duration: "4-6 hours",
    category: "cleaning",
    features: [
      { en: "Wall cleaning", ar: "تنظيف الجدران" },
      { en: "Carpet cleaning", ar: "تنظيف السجاد" },
      { en: "Kitchen deep clean", ar: "تنظيف المطبخ بعمق" },
      { en: "Window cleaning", ar: "تنظيف النوافذ" },
      { en: "Furniture polishing", ar: "تلميع الأثاث" },
    ],
  },
  {
    id: "cockroach-control",
    nameEn: "Cockroach Control",
    nameAr: "مكافحة الصراصير",
    descriptionEn: "Effective cockroach elimination with preventive treatment",
    descriptionAr: "القضاء الفعال على الصراصير",
    price: 400,
    currency: "AED",
    duration: "1-2 hours",
    category: "pest",
    features: [
      { en: "Chemical treatment", ar: "المعالجة الكيميائية" },
      { en: "Preventive spraying", ar: "الرش الوقائي" },
      { en: "Safe for families", ar: "آمن للعائلات" },
      { en: "30-day warranty", ar: "ضمان 30 يوم" },
    ],
  },
  {
    id: "covid-disinfection",
    nameEn: "COVID-19 Disinfection",
    nameAr: "تطهير كوفيد-19",
    descriptionEn: "Specialized COVID-19 disinfection service",
    descriptionAr: "خدمة تطهير متخصصة لكوفيد-19",
    price: 1000,
    currency: "AED",
    duration: "3-4 hours",
    category: "sanitization",
    features: [
      { en: "Fogging treatment", ar: "معالجة الرش الضبابي" },
      { en: "EPA-approved disinfectants", ar: "معقمات معتمدة" },
      { en: "Air purification", ar: "تنقية الهواء" },
      { en: "Certification provided", ar: "شهادة معتمدة" },
    ],
  },
];
