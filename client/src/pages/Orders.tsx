import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Package, ArrowRight } from "lucide-react";

export default function Orders() {
  const { language, isRTL } = useLanguage();

  const orders = [
    {
      id: "ORD-001",
      service: language === "en" ? "Daily Office Cleaning" : "التنظيف اليومي للمكاتب",
      status: "completed",
      date: "2024-01-25",
      price: "500 AED",
    },
    {
      id: "ORD-002",
      service: language === "en" ? "Deep Cleaning Service" : "خدمة التنظيف العميق",
      status: "in-progress",
      date: "2024-02-01",
      price: "1200 AED",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-8">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === "en" ? "My Orders" : "طلباتي"}
          </h1>
          <p className="text-muted-foreground">
            {language === "en" ? "Track your service orders" : "تتبع طلبات الخدمة الخاصة بك"}
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="container py-8 space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{order.service}</CardTitle>
                    <CardDescription>{order.id}</CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {order.status === "completed"
                      ? (language === "en" ? "Completed" : "مكتمل")
                      : (language === "en" ? "In Progress" : "قيد التنفيذ")}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Date: " : "التاريخ: "}{order.date}
                    </p>
                    <p className="text-lg font-semibold text-primary">{order.price}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {language === "en" ? "View Details" : "عرض التفاصيل"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              {language === "en" ? "No orders yet" : "لا توجد طلبات حتى الآن"}
            </p>
            <Link href="/services">
              <Button>
                {language === "en" ? "Browse Services" : "تصفح الخدمات"}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
