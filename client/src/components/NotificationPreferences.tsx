import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, MessageSquare, Mail } from 'lucide-react';

interface NotificationChannel {
  id: 'sms' | 'whatsapp' | 'email';
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function NotificationPreferences() {
  const { language } = useLanguage();

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'notifications.title': 'Notification Preferences',
        'notifications.description': 'Choose how you want to receive updates about your appointments and orders',
        'notifications.sms': 'SMS Messages',
        'notifications.whatsapp': 'WhatsApp',
        'notifications.email': 'Email',
        'notifications.reminders': 'Appointment Reminders',
        'notifications.updates': 'Status Updates',
        'notifications.confirmations': 'Order Confirmations',
        'notifications.save': 'Save Preferences',
      },
      ar: {
        'notifications.title': 'تفضيلات الإشعارات',
        'notifications.description': 'اختر كيفية استقبالك للتحديثات حول مواعيدك وطلباتك',
        'notifications.sms': 'رسائل SMS',
        'notifications.whatsapp': 'واتس آب',
        'notifications.email': 'البريد الإلكتروني',
        'notifications.reminders': 'تذكيرات المواعيد',
        'notifications.updates': 'تحديثات الحالة',
        'notifications.confirmations': 'تأكيدات الطلب',
        'notifications.save': 'حفظ التفضيلات',
      },
    };
    return translations[language]?.[key] || key;
  };

  const channels: NotificationChannel[] = [
    { id: 'sms', name: t('notifications.sms'), icon: <Bell size={20} />, enabled: true },
    { id: 'whatsapp', name: t('notifications.whatsapp'), icon: <MessageSquare size={20} />, enabled: true },
    { id: 'email', name: t('notifications.email'), icon: <Mail size={20} />, enabled: false },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-2">{t('notifications.title')}</h2>
      <p className="text-gray-600 mb-6">{t('notifications.description')}</p>

      <div className="space-y-6">
        {/* Notification Channels */}
        <div>
          <h3 className="font-semibold mb-4">Channels</h3>
          <div className="space-y-3">
            {channels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  {channel.icon}
                  <span className="font-medium">{channel.name}</span>
                </div>
                <Switch checked={channel.enabled} />
              </div>
            ))}
          </div>
        </div>

        {/* Notification Types */}
        <div>
          <h3 className="font-semibold mb-4">Notification Types</h3>
          <div className="space-y-3">
            {[
              { id: 'reminders', label: t('notifications.reminders') },
              { id: 'updates', label: t('notifications.updates') },
              { id: 'confirmations', label: t('notifications.confirmations') },
            ].map((type) => (
              <div key={type.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span className="font-medium">{type.label}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full">{t('notifications.save')}</Button>
      </div>
    </div>
  );
}
