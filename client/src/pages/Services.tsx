import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, Award, CheckCircle2, ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { realServices } from "@/data/services";

export default function Services() {
  const { language, t, isRTL } = useLanguage();
  const { addItem } = useCart();

  const handleAddToCart = (service: typeof realServices[0]) => {
    addItem({
      id: service.id,
      nameEn: service.nameEn,
      nameAr: service.nameAr,
      price: service.price,
      duration: service.duration,
      category: service.category,
    });
    toast.success(
      language === "en"
        ? "Service added to cart!"
        : "تم إضافة الخدمة إلى السلة!"
    );
  };

  const serviceCategories = [
    {
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
    },
    {
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
    },
    {
      icon: Award,
      titleEn: "Sanitization & Disinfection",
      titleAr: "التعقيم والتطهير",
      descriptionEn: "Hospital-grade sanitization and disinfection services",
      descriptionAr: "خدمات التعقيم والتطهير بمستوى المستشفيات",
      image: "/service-sanitization.jpg",
      features: [
        { en: "General sanitization", ar: "التعقيم العام" },
        { en: "COVID-19 disinfection", ar: "تطهير كوفيد-19" },
        { en: "Post-event sanitization", ar: "التعقيم بعد الفعاليات" },
        { en: "EPA-approved disinfectants", ar: "معقمات معتمدة من EPA" },
        { en: "Air purification", ar: "تنقية الهواء" },
        { en: "Certification provided", ar: "شهادة معتمدة" }
      ],
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("services.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("services.description")}
          </p>
        </div>
      </div>

      {/* Service Categories */}
      <div className="container py-12 space-y-16">
        {serviceCategories.map((category, idx) => {
          const Icon = category.icon;
          const categoryServices = realServices.filter(s => {
            if (idx === 0) return s.category === "cleaning";
            if (idx === 1) return s.category === "pest";
            return s.category === "sanitization";
          });

          return (
            <div key={idx} className="space-y-8">
              {/* Category Header */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {language === "en" ? category.titleEn : category.titleAr}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {language === "en" ? category.descriptionEn : category.descriptionAr}
                  </p>
                </div>
              </div>

              {/* Category Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      {language === "en" ? feature.en : feature.ar}
                    </span>
                  </div>
                ))}
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service) => (
                  <Card key={service.id} className="hover:shadow-lg transition-all overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">
                        {language === "en" ? service.nameEn : service.nameAr}
                      </CardTitle>
                      <CardDescription>
                        {language === "en" ? service.descriptionEn : service.descriptionAr}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Features */}
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {language === "en" ? feature.en : feature.ar}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing and Duration */}
                      <div className="border-t pt-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            {language === "en" ? "Price:" : "السعر:"}
                          </span>
                          <span className="text-2xl font-bold text-primary">
                            {service.price} AED
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            {language === "en" ? "Duration:" : "المدة:"}
                          </span>
                          <span className="font-medium">{service.duration}</span>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => handleAddToCart(service)}
                        className="w-full"
                        size="lg"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {language === "en" ? "Add to Cart" : "أضف إلى السلة"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === "en" ? "Ready to Book?" : "هل أنت مستعد للحجز؟"}
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {language === "en"
              ? "Add services to your cart and proceed to checkout for a seamless booking experience."
              : "أضف الخدمات إلى سلتك وانتقل إلى الدفع للحصول على تجربة حجز سلسة."}
          </p>
          <Link href="/cart">
            <Button size="lg" variant="secondary">
              {language === "en" ? "View Cart" : "عرض السلة"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
