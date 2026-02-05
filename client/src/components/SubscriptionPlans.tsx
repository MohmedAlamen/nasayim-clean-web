import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  description?: string;
  monthlyPrice: string;
  servicesIncluded: number;
  features?: string[];
}

interface SubscriptionPlansProps {
  plans?: Plan[];
  onSelectPlan?: (planId: number) => void;
}

export default function SubscriptionPlans({ plans = [], onSelectPlan }: SubscriptionPlansProps) {
  const { language } = useLanguage();

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'subscription.title': 'Choose Your Plan',
        'subscription.monthly': 'per month',
        'subscription.services': 'Services included',
        'subscription.select': 'Select Plan',
      },
      ar: {
        'subscription.title': 'اختر خطتك',
        'subscription.monthly': 'شهرياً',
        'subscription.services': 'الخدمات المضمنة',
        'subscription.select': 'اختيار الخطة',
      },
    };
    return translations[language]?.[key] || key;
  };

  if (plans.length === 0) return null;

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8">{t('subscription.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-blue-600">{plan.monthlyPrice}</span>
              <span className="text-gray-600 text-sm"> {t('subscription.monthly')}</span>
            </div>

            <p className="text-sm font-semibold mb-4">
              {plan.servicesIncluded} {t('subscription.services')}
            </p>

            {plan.features && (
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <Button
              onClick={() => onSelectPlan?.(plan.id)}
              className="w-full"
            >
              {t('subscription.select')}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
