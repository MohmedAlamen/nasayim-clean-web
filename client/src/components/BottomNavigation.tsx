import { Home, ShoppingCart, Package, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BottomNavigation() {
  const [location] = useLocation();
  const { language, isRTL } = useLanguage();

  const navItems = [
    { 
      path: "/", 
      icon: Home, 
      labelEn: "Home", 
      labelAr: "الرئيسية" 
    },
    { 
      path: "/services", 
      icon: ShoppingCart, 
      labelEn: "Services", 
      labelAr: "الخدمات" 
    },
    { 
      path: "/orders", 
      icon: Package, 
      labelEn: "Orders", 
      labelAr: "الطلبات" 
    },
    { 
      path: "/account", 
      icon: User, 
      labelEn: "Account", 
      labelAr: "حسابي" 
    },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 border-t border-border shadow-lg md:hidden z-40"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-around h-20 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <a className={`flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">
                  {language === "en" ? item.labelEn : item.labelAr}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
