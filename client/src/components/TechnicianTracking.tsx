import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Clock, User } from 'lucide-react';

interface TechnicianLocation {
  technicianName: string;
  status: 'available' | 'en_route' | 'on_site' | 'completed';
  latitude: string;
  longitude: string;
  eta?: string;
  accuracy?: number;
}

interface TechnicianTrackingProps {
  technician?: TechnicianLocation;
}

export default function TechnicianTracking({ technician }: TechnicianTrackingProps) {
  const { language } = useLanguage();

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'tracking.title': 'Technician Location',
        'tracking.status': 'Status',
        'tracking.eta': 'Estimated Arrival',
        'tracking.available': 'Available',
        'tracking.en_route': 'On the way',
        'tracking.on_site': 'On site',
        'tracking.completed': 'Completed',
        'tracking.view_map': 'View on Map',
      },
      ar: {
        'tracking.title': 'موقع الفني',
        'tracking.status': 'الحالة',
        'tracking.eta': 'الوصول المتوقع',
        'tracking.available': 'متاح',
        'tracking.en_route': 'في الطريق',
        'tracking.on_site': 'في الموقع',
        'tracking.completed': 'مكتمل',
        'tracking.view_map': 'عرض على الخريطة',
      },
    };
    return translations[language]?.[key] || key;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'en_route':
        return 'bg-blue-100 text-blue-800';
      case 'on_site':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!technician) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <h3 className="font-bold mb-3 flex items-center gap-2">
        <MapPin size={18} className="text-blue-600" />
        {t('tracking.title')}
      </h3>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <User size={16} className="text-gray-600" />
          <span className="font-semibold">{technician.technicianName}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{t('tracking.status')}:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(technician.status)}`}>
            {t(`tracking.${technician.status}`)}
          </span>
        </div>

        {technician.eta && (
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-600" />
            <span className="text-sm">{t('tracking.eta')}: {technician.eta}</span>
          </div>
        )}

        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
          <p className="text-gray-600">
            📍 {technician.latitude}, {technician.longitude}
          </p>
          {technician.accuracy && (
            <p className="text-xs text-gray-500 mt-1">
              Accuracy: ±{technician.accuracy}m
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
