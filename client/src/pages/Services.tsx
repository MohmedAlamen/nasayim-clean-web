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
      image: "https://private-us-east-1.manuscdn.com/sessionFile/Vp0ePiodyzYRyUBygjPQpp/sandbox/NpGsqptyJBQBeNqZfuOihu-img-1_1770092952000_na1fn_cHJvZmVzc2lvbmFsLW9mZmljZS1jbGVhbmluZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVnAwZVBpb2R5ellSeVVCeWdqUFFwcC9zYW5kYm94L05wR3NxcHR5SkJRQmVOcVpmdU9paHUtaW1nLTFfMTc3MDA5Mjk1MjAwMF9uYTFmbl9jSEp2Wm1WemMybHZibUZzTFc5bVptbGpaUzFqYkdWaGJtbHVady5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PBc9e1J25RrLADOZbpQelDHYmn~UC7ZDrSs1QT5WVqLpTpZ-tjgYkrepUblct8NhbgXj6wxPZPuHE8kp34fJDehEDeHlbB4nUFXkxqvOyypiWa93KqUtD81y2924WbnDeE9mQNOQXi8hCeAg9U-vQdVGo-xLVpnwb~5pnbqAU9idNVrRcmhZM1129bBioIMWAYbz~XKluKft8UPMu5MY4co5d1tn35MgxiqDNVtf9A5tM4mMxw33f1YvcABYnJuhLynl3d8VLMwQHbW3~TlxHwY1HpYsjVOVvtJ3tKMeosJnt8SvrSnEZXhpqzDzqjkfR5nzNlUfwa9~12AYKUAoyg__",
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
      image: "https://private-us-east-1.manuscdn.com/sessionFile/Vp0ePiodyzYRyUBygjPQpp/sandbox/NpGsqptyJBQBeNqZfuOihu-img-2_1770092951000_na1fn_cGVzdC1jb250cm9sLXNlcnZpY2U.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVnAwZVBpb2R5ellSeVVCeWdqUFFwcC9zYW5kYm94L05wR3NxcHR5SkJRQmVOcVpmdU9paHUtaW1nLTJfMTc3MDA5Mjk1MTAwMF9uYTFmbl9jR1Z6ZEMxamIyNTBjbTlzTFhObGNuWnBZMlUuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=WcqdMhJMBPUGB-QxmMbRFAWFZA5O9~LMy8txEjS2W1bHcYg9NKuK6IwriPogDSCvX8~5nsrnXSSq-ZWlM4AfYieA7Vbxi1EZDhd7oZdXxJMNDQPcA5rcY~b-POtp~YSqxgPiXNwaxRwvgzlKwTOVvNzryqRwXkhKmAOZMXs65NutmHkuyQf9jK14Ha34YIkUlZ1W1YloYEp0TR8jenqAVDF8uiE4w~PUFFQIRllrt-WgRYpskWkRYLw-GoZHfUM~GixCfKEeHTfiMxxcrVXfKA08Ks~amIhXL8J2oVYvfxBk9ac962Zhhrwe7q-5kr23INbfgPMyzOe0wPIIh70zew__",
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
      image: "https://private-us-east-1.manuscdn.com/sessionFile/Vp0ePiodyzYRyUBygjPQpp/sandbox/NpGsqptyJBQBeNqZfuOihu-img-3_1770092958000_na1fn_c2FuaXRpemF0aW9uLXNlcnZpY2U.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVnAwZVBpb2R5ellSeVVCeWdqUFFwcC9zYW5kYm94L05wR3NxcHR5SkJRQmVOcVpmdU9paHUtaW1nLTNfMTc3MDA5Mjk1ODAwMF9uYTFmbl9jMkZ1YVhScGVtRjBhVzl1TFhObGNuWnBZMlUuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=gQJ1woHliD~IdzkS4jO~q10Iu~gI-4bfOxyfm5Kr1KWC6E9Do5rvuAR42aQU9sqV0UMRkRHLK-LwE6hKWyZClhoGuFRXbDy0K7UX7I-R9mD1Qq7ic5FyDLLu3R1Py5i2Sz5a-fKLAXC9YogUR9TrzkKuCJdfLhqKIWY-3PrXVTwsIsahKjvwrPy23K9OldYbVwQuda0iBXWwqveCXZwt7xaTaVlIDjtkoDNnLOIlPfunIVoPCJF4B1IykLKBewpBBbeBEsu~aEl3CSSB0p30hEbvto8HtpUIcv6p0pQ29OTXNHMWXivtugf1cE8xLuPuhEZEZAiJIyjDqsz4KCilig__",
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
