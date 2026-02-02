import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { CreditCard, Truck, Lock } from "lucide-react";
import { useState } from "react";

export default function Checkout() {
  const { language, isRTL } = useLanguage();
  const { items, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = (getTotal() * 0.05);
  const total = getTotal() + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      // In a real app, redirect to success page
      alert(language === "en" ? "Order placed successfully!" : "تم تقديم الطلب بنجاح!");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-24 flex items-center justify-center" dir={isRTL ? "rtl" : "ltr"}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "en" ? "Your cart is empty" : "سلتك فارغة"}
          </h1>
          <Link href="/services">
            <Button>{language === "en" ? "Browse Services" : "تصفح الخدمات"}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-8">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === "en" ? "Checkout" : "الدفع"}
          </h1>
          <p className="text-muted-foreground">
            {language === "en" ? "Complete your order" : "أكمل طلبك"}
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    {language === "en" ? "Delivery Information" : "معلومات التسليم"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{language === "en" ? "First Name" : "الاسم الأول"}</Label>
                      <Input required placeholder={language === "en" ? "John" : "أحمد"} />
                    </div>
                    <div>
                      <Label>{language === "en" ? "Last Name" : "الاسم الأخير"}</Label>
                      <Input required placeholder={language === "en" ? "Doe" : "محمد"} />
                    </div>
                  </div>
                  <div>
                    <Label>{language === "en" ? "Email" : "البريد الإلكتروني"}</Label>
                    <Input type="email" required placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label>{language === "en" ? "Phone" : "الهاتف"}</Label>
                    <Input type="tel" required placeholder="+971 50 123 4567" />
                  </div>
                  <div>
                    <Label>{language === "en" ? "Address" : "العنوان"}</Label>
                    <Input required placeholder={language === "en" ? "123 Main Street" : "123 شارع رئيسي"} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{language === "en" ? "City" : "المدينة"}</Label>
                      <Input required placeholder={language === "en" ? "Dubai" : "دبي"} />
                    </div>
                    <div>
                      <Label>{language === "en" ? "Postal Code" : "الرمز البريدي"}</Label>
                      <Input required placeholder="12345" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    {language === "en" ? "Payment Method" : "طريقة الدفع"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { id: "card", label: language === "en" ? "Credit/Debit Card" : "بطاقة ائتمان/خصم" },
                      { id: "apple", label: language === "en" ? "Apple Pay" : "Apple Pay" },
                      { id: "google", label: language === "en" ? "Google Pay" : "Google Pay" },
                    ].map((method) => (
                      <label key={method.id} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>{method.label}</span>
                      </label>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mt-6 pt-6 border-t">
                      <div>
                        <Label>{language === "en" ? "Card Number" : "رقم البطاقة"}</Label>
                        <Input placeholder="4242 4242 4242 4242" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>{language === "en" ? "Expiry Date" : "تاريخ الانتهاء"}</Label>
                          <Input placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label>{language === "en" ? "CVV" : "CVV"}</Label>
                          <Input placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                <Lock className="w-4 h-4 mr-2" />
                {isProcessing
                  ? (language === "en" ? "Processing..." : "جاري المعالجة...")
                  : (language === "en" ? "Complete Order" : "إكمال الطلب")}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>
                  {language === "en" ? "Order Summary" : "ملخص الطلب"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {language === "en" ? item.nameEn : item.nameAr}
                        <span className="text-muted-foreground"> x{item.quantity}</span>
                      </span>
                      <span className="font-medium">{item.price * item.quantity} AED</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {language === "en" ? "Subtotal" : "المجموع الفرعي"}
                    </span>
                    <span>{subtotal} AED</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {language === "en" ? "Tax (5%)" : "الضريبة (5%)"}
                    </span>
                    <span>{tax.toFixed(2)} AED</span>
                  </div>

                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>{language === "en" ? "Total" : "الإجمالي"}</span>
                    <span className="text-primary">{total.toFixed(2)} AED</span>
                  </div>
                </div>

                <Link href="/cart">
                  <Button variant="outline" className="w-full">
                    {language === "en" ? "Back to Cart" : "العودة للسلة"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
