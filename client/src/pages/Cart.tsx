import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function Cart() {
  const { language, isRTL } = useLanguage();
  const { items, removeItem, updateQuantity, getTotal, applyCoupon, discountCode, discountPercent } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const tax = (getTotal() * 0.05);
  const total = getTotal() + tax;

  const handleApplyCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("coupon") as string;
    if (code) {
      if (applyCoupon(code)) {
        (e.target as HTMLFormElement).reset();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-8">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === "en" ? "Shopping Cart" : "سلة التسوق"}
          </h1>
          <p className="text-muted-foreground">
            {language === "en" ? "Review your selected services" : "راجع الخدمات المختارة"}
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {language === "en" ? item.nameEn : item.nameAr}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Duration: " : "المدة: "}{item.duration}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        {item.price} AED
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-background rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-background rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Subtotal" : "المجموع الفرعي"}
                        </p>
                        <p className="font-semibold">
                          {item.price * item.quantity} AED
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  {language === "en" ? "Your cart is empty" : "سلتك فارغة"}
                </p>
                <Link href="/services">
                  <Button>
                    {language === "en" ? "Browse Services" : "تصفح الخدمات"}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>
                    {language === "en" ? "Order Summary" : "ملخص الطلب"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Coupon Section */}
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "en" ? "Coupon Code" : "رمز القسيمة"}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        name="coupon"
                        placeholder={language === "en" ? "Enter code" : "أدخل الرمز"}
                        disabled={!!discountCode}
                      />
                      <Button type="submit" size="sm" disabled={!!discountCode}>
                        {language === "en" ? "Apply" : "تطبيق"}
                      </Button>
                    </div>
                    {discountCode && (
                      <p className="text-sm text-green-600">
                        {language === "en" ? "Coupon applied: " : "تم تطبيق القسيمة: "}{discountCode}
                      </p>
                    )}
                  </form>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {language === "en" ? "Subtotal" : "المجموع الفرعي"}
                      </span>
                      <span>{subtotal} AED</span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>
                          {language === "en" ? "Discount" : "الخصم"} ({discountPercent}%)
                        </span>
                        <span>-{discount.toFixed(2)} AED</span>
                      </div>
                    )}

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

                  <Link href="/checkout">
                    <Button className="w-full" size="lg">
                      {language === "en" ? "Proceed to Checkout" : "المتابعة للدفع"}
                    </Button>
                  </Link>

                  <Link href="/services">
                    <Button variant="outline" className="w-full">
                      {language === "en" ? "Continue Shopping" : "متابعة التسوق"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
