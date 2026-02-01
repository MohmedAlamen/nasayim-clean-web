import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { language, t, isRTL } = useLanguage();

  const services = [
    {
      id: 1,
      icon: Sparkles,
      titleEn: "Professional Cleaning",
      titleAr: "التنظيف الاحترافي",
      descriptionEn: "Comprehensive cleaning services for offices, homes, and commercial spaces",
      descriptionAr: "خدمات تنظيف شاملة للمكاتب والمنازل والمنشآت التجارية",
      image: "/service-cleaning.jpg",
      features: [
        { en: "Daily office cleaning", ar: "التنظيف اليومي للمكاتب" },
        { en: "Deep cleaning services", ar: "خدمات التنظيف العميق" },
        { en: "Window and facade cleaning", ar: "تنظيف النوافذ والواجهات" },
        { en: "Carpet and upholstery cleaning", ar: "تنظيف السجاد والمفروشات" },
        { en: "Floor polishing and waxing", ar: "تلميع الأرضيات والشمع" },
        { en: "Eco-friendly products", ar: "منتجات صديقة للبيئة" }
      ],
      price: { en: "Starting from AED 500", ar: "يبدأ من 500 درهم" }
    },
    {
      id: 2,
      icon: Zap,
      titleEn: "Pest Control",
      titleAr: "مكافحة الآفات",
      descriptionEn: "Safe and effective pest prevention and elimination",
      descriptionAr: "منع فعال وآمن للآفات والقضاء عليها",
      image: "/service-pest-control.jpg",
      features: [
        { en: "Cockroach control", ar: "مكافحة الصراصير" },
        { en: "Rodent elimination", ar: "القضاء على القوارض" },
        { en: "Termite treatment", ar: "معالجة النمل الأبيض" },
        { en: "Mosquito control", ar: "مكافحة البعوض" },
        { en: "Bed bug treatment", ar: "معالجة بق الفراش" },
        { en: "Safe for families and pets", ar: "آمن للعائلات والحيوانات الأليفة" }
      ],
      price: { en: "Starting from AED 300", ar: "يبدأ من 300 درهم" }
    },
    {
      id: 3,
      icon: Award,
      titleEn: "Sanitization & Disinfection",
      titleAr: "التعقيم والتطهير",
      descriptionEn: "Hospital-grade sanitization for maximum hygiene",
      descriptionAr: "تعقيم بمستوى المستشفيات لأقصى درجات النظافة",
      image: "/service-sanitization.jpg",
      features: [
        { en: "COVID-19 disinfection", ar: "تطهير كوفيد-19" },
        { en: "Hospital-grade sanitization", ar: "تعقيم بمستوى المستشفيات" },
        { en: "Surface disinfection", ar: "تطهير الأسطح" },
        { en: "Air purification", ar: "تنقية الهواء" },
        { en: "Fogging treatment", ar: "معالجة الرش الضبابي" },
        { en: "Certified safe products", ar: "منتجات معتمدة وآمنة" }
      ],
      price: { en: "Starting from AED 400", ar: "يبدأ من 400 درهم" }
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="NASAYIM CLEAN" className="w-10 h-10" />
              <span className="text-xl font-bold text-foreground">NASAYIM</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/services">
              <a className="text-foreground hover:text-primary transition-colors font-semibold">{t("nav.services")}</a>
            </Link>
            <Link href="/about">
              <a className="text-foreground hover:text-primary transition-colors">{t("nav.about")}</a>
            </Link>
            <Link href="/contact">
              <a className="text-foreground hover:text-primary transition-colors">{t("nav.contact")}</a>
            </Link>
          </div>
          <Link href="/login">
            <Button>{t("nav.login")}</Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {language === "en" ? "Our Services" : "خدماتنا"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "Comprehensive cleaning and pest control solutions tailored to your needs"
              : "حلول شاملة للتنظيف ومكافحة الآفات مصممة حسب احتياجاتك"}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container space-y-16">
          {services.map((service) => (
            <div key={service.id} className="grid md:grid-cols-2 gap-8 items-center">
              <div className={isRTL ? "md:order-2" : ""}>
                <img
                  src={service.image}
                  alt={language === "en" ? service.titleEn : service.titleAr}
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
              </div>
              <div className={isRTL ? "md:order-1" : ""}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">
                      {language === "en" ? service.titleEn : service.titleAr}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {language === "en" ? service.descriptionEn : service.descriptionAr}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <span className="text-foreground">
                          {language === "en" ? feature.en : feature.ar}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-primary">
                      {language === "en" ? service.price.en : service.price.ar}
                    </p>
                    <Link href="/contact">
                      <Button size="lg" className="gap-2">
                        {language === "en" ? "Get Quote" : "احصل على عرض سعر"}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-bold">
            {language === "en" ? "Ready to Get Started?" : "هل أنت مستعد للبدء؟"}
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {language === "en"
              ? "Contact us today for a free quote and let us help keep your space clean and pest-free"
              : "تواصل معنا اليوم للحصول على عرض سعر مجاني"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                {language === "en" ? "Book Now" : "احجز الآن"}
              </Button>
            </Link>
            <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                {language === "en" ? "WhatsApp Us" : "تواصل عبر واتس"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
