import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CheckCircle2, Users, Zap, Award, ArrowRight, Moon, Sun, Globe } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // SEO Meta Tags
  React.useEffect(() => {
    document.title = language === "en" ? "NASAYIM CLEAN - Professional Cleaning & Pest Control Services in Riyadh" : "نسائم كلين - خدمات التنظيف ومكافحة الآفات الاحترافية في الرياض";
    document.querySelector('meta[name="description"]')?.setAttribute("content", language === "en" ? "Professional cleaning and pest control services in Riyadh. Trusted by businesses and homes. Book your service today!" : "خدمات التنظيف ومكافحة الآفات الاحترافية في الرياض. موثوقة من قبل الشركات والمنازل. احجز خدمتك اليوم!");
  }, [language]);

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
              <a className="text-foreground hover:text-primary transition-colors">{t("nav.services")}</a>
            </Link>
            <Link href="/about">
              <a className="text-foreground hover:text-primary transition-colors">{t("nav.about")}</a>
            </Link>
            <Link href="/contact">
              <a className="text-foreground hover:text-primary transition-colors">{t("nav.contact")}</a>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </button>
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="p-2 hover:bg-muted rounded-lg transition-colors flex items-center gap-1"
            >
              <Globe className="w-5 h-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">{language === "en" ? "العربية" : "English"}</span>
            </button>
            <Link href="/login">
              <Button>{t("nav.login")}</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              {t("home.hero.title")}
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-primary">
              {t("home.hero.subtitle")}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("home.hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                {t("home.cta.book")}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                {t("home.cta.services")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">{t("home.services.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.services.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: language === "en" ? "Professional Cleaning" : "التنظيف الاحترافي",
                description: language === "en" 
                  ? "Office, residential, and commercial cleaning services with attention to detail"
                  : "خدمات تنظيف المكاتب والمنازل والمنشآت التجارية بعناية فائقة"
              },
              {
                icon: Zap,
                title: language === "en" ? "Pest Control" : "مكافحة الآفات",
                description: language === "en"
                  ? "Effective pest prevention and elimination for a safe, healthy environment"
                  : "منع فعال للآفات والقضاء عليها لبيئة آمنة وصحية"
              },
              {
                icon: Award,
                title: language === "en" ? "Sanitization" : "التعقيم والتطهير",
                description: language === "en"
                  ? "Deep cleaning and disinfection services for maximum hygiene"
                  : "خدمات التنظيف العميق والتعقيم لأقصى درجات النظافة"
              }
            ].map((service, idx) => (
              <Card key={idx} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link href="/services">
              <Button variant="outline" size="lg">
                {language === "en" ? "Explore All Services" : "اكتشف جميع الخدمات"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/50">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">{t("home.why.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.why.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              language === "en" ? "Professional and trained technicians" : "فنيون محترفون ومدربون",
              language === "en" ? "Eco-friendly cleaning solutions" : "حلول تنظيف صديقة للبيئة",
              language === "en" ? "24/7 customer support" : "دعم العملاء على مدار الساعة",
              language === "en" ? "Competitive pricing" : "أسعار تنافسية",
              language === "en" ? "Fast and reliable service" : "خدمة سريعة وموثوقة",
              language === "en" ? "Satisfaction guaranteed" : "الرضا مضمون"
            ].map((reason, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-foreground font-medium">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{t("home.cta.ready")}</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              {language === "en"
                ? "Contact us today for a free quote and let us help keep your space clean and pest-free"
                : "تواصل معنا اليوم للحصول على عرض سعر مجاني واترك لنا مسؤولية الحفاظ على نظافة مساحتك"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                {t("home.cta.quote")}
              </Button>
            </Link>
            <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                {t("home.cta.whatsapp")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">NASAYIM CLEAN</h3>
              <p className="text-sm text-muted-foreground">
                {language === "en"
                  ? "Professional cleaning and pest control services"
                  : "خدمات التنظيف الاحترافية ومكافحة الآفات"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {language === "en" ? "Services" : "الخدمات"}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services"><a className="hover:text-primary">{language === "en" ? "Cleaning" : "التنظيف"}</a></Link></li>
                <li><Link href="/services"><a className="hover:text-primary">{language === "en" ? "Pest Control" : "مكافحة الآفات"}</a></Link></li>
                <li><Link href="/services"><a className="hover:text-primary">{language === "en" ? "Sanitization" : "التعقيم"}</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {language === "en" ? "Company" : "الشركة"}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about"><a className="hover:text-primary">{t("nav.about")}</a></Link></li>
                <li><Link href="/contact"><a className="hover:text-primary">{t("nav.contact")}</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {language === "en" ? "Contact" : "التواصل"}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{language === "en" ? "Email: info@nasayim.com" : "البريد: info@nasayim.com"}</li>
                <li>{language === "en" ? "Phone: +971 50 123 4567" : "الهاتف: +971 50 123 4567"}</li>
                <li>{language === "en" ? "Dubai, UAE" : "دبي، الإمارات"}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
