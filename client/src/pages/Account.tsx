import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, LogOut, Settings } from "lucide-react";

export default function Account() {
  const { language, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-8">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === "en" ? "My Account" : "حسابي"}
          </h1>
        </div>
      </div>

      {/* Account Content */}
      <div className="container py-8 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {language === "en" ? "Profile Information" : "معلومات الملف الشخصي"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Name" : "الاسم"}
              </p>
              <p className="text-lg font-semibold">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Email" : "البريد الإلكتروني"}
              </p>
              <p className="text-lg font-semibold">john@example.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Phone" : "الهاتف"}
              </p>
              <p className="text-lg font-semibold">+971 50 123 4567</p>
            </div>
            <Button variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              {language === "en" ? "Edit Profile" : "تعديل الملف الشخصي"}
            </Button>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === "en" ? "Payment Methods" : "طرق الدفع"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                {language === "en" ? "Visa Card" : "بطاقة فيزا"}
              </p>
              <p className="font-semibold">**** **** **** 4242</p>
            </div>
            <Button variant="outline" className="w-full">
              {language === "en" ? "Add Payment Method" : "إضافة طريقة دفع"}
            </Button>
          </CardContent>
        </Card>

        {/* Addresses */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === "en" ? "Addresses" : "العناوين"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                {language === "en" ? "Home" : "المنزل"}
              </p>
              <p className="font-semibold">123 Main Street, Dubai, UAE</p>
            </div>
            <Button variant="outline" className="w-full">
              {language === "en" ? "Add Address" : "إضافة عنوان"}
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="destructive" className="w-full" size="lg">
          <LogOut className="w-4 h-4 mr-2" />
          {language === "en" ? "Logout" : "تسجيل الخروج"}
        </Button>
      </div>
    </div>
  );
}
