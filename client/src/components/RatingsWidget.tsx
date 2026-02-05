import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface RatingsWidgetProps {
  orderId: number;
  onSubmit?: (rating: number, review: string) => void;
}

export default function RatingsWidget({ orderId, onSubmit }: RatingsWidgetProps) {
  const { language } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'rating.title': 'Rate this service',
        'rating.placeholder': 'Share your experience...',
        'rating.submit': 'Submit Rating',
        'rating.thanks': 'Thank you for your feedback!',
      },
      ar: {
        'rating.title': 'قيّم هذه الخدمة',
        'rating.placeholder': 'شارك تجربتك...',
        'rating.submit': 'إرسال التقييم',
        'rating.thanks': 'شكراً لتقييمك!',
      },
    };
    return translations[language]?.[key] || key;
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit?.(rating, review);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  if (submitted) {
    return (
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-green-700 text-center">{t('rating.thanks')}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="font-semibold mb-3">{t('rating.title')}</h3>
      
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              size={28}
              className={
                star <= (hoveredRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }
            />
          </button>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder={t('rating.placeholder')}
        className="w-full p-2 border rounded-lg mb-3 text-sm"
        rows={3}
      />

      <Button
        onClick={handleSubmit}
        disabled={rating === 0}
        className="w-full"
      >
        {t('rating.submit')}
      </Button>
    </div>
  );
}
