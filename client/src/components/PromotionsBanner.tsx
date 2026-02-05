import { useLanguage } from '@/contexts/LanguageContext';
import { Zap } from 'lucide-react';

interface PromotionsBannerProps {
  promotions?: Array<{
    code: string;
    description: string;
    discountValue: string;
  }>;
}

export default function PromotionsBanner({ promotions = [] }: PromotionsBannerProps) {
  const { language } = useLanguage();

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'promo.title': 'Special Offers',
        'promo.code': 'Code',
      },
      ar: {
        'promo.title': 'عروض خاصة',
        'promo.code': 'الكود',
      },
    };
    return translations[language]?.[key] || key;
  };

  if (promotions.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={20} />
        <h3 className="font-bold text-lg">{t('promo.title')}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {promotions.map((promo) => (
          <div key={promo.code} className="bg-blue-700 p-3 rounded-lg">
            <p className="text-sm">{promo.description}</p>
            <p className="text-xs mt-1 opacity-90">
              {t('promo.code')}: <span className="font-mono font-bold">{promo.code}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
