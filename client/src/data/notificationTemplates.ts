export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'appointment_reminder' | 'status_update' | 'confirmation' | 'completion' | 'feedback';
  channels: ('sms' | 'whatsapp' | 'email')[];
  template: {
    en: string;
    ar: string;
  };
  variables: string[];
  timing?: {
    before?: number; // minutes before appointment
    after?: number; // minutes after event
  };
}

export const notificationTemplates: NotificationTemplate[] = [
  {
    id: 'appointment_reminder_24h',
    name: 'Appointment Reminder - 24 Hours',
    type: 'appointment_reminder',
    channels: ['sms', 'whatsapp'],
    template: {
      en: 'Hi {{customerName}}, reminder: Your {{serviceName}} appointment is scheduled for {{appointmentDate}} at {{appointmentTime}}. Reply CONFIRM to confirm or CANCEL to cancel.',
      ar: 'مرحباً {{customerName}}، تذكير: موعدك لخدمة {{serviceName}} مجدول في {{appointmentDate}} الساعة {{appointmentTime}}. رد CONFIRM للتأكيد أو CANCEL للإلغاء.',
    },
    variables: ['customerName', 'serviceName', 'appointmentDate', 'appointmentTime'],
    timing: { before: 1440 }, // 24 hours
  },
  {
    id: 'appointment_reminder_1h',
    name: 'Appointment Reminder - 1 Hour',
    type: 'appointment_reminder',
    channels: ['sms', 'whatsapp'],
    template: {
      en: 'Hi {{customerName}}, your {{serviceName}} appointment is in 1 hour ({{appointmentTime}}). Our technician {{technicianName}} is on the way.',
      ar: 'مرحباً {{customerName}}، موعدك لخدمة {{serviceName}} بعد ساعة واحدة ({{appointmentTime}}). فنينا {{technicianName}} في الطريق.',
    },
    variables: ['customerName', 'serviceName', 'appointmentTime', 'technicianName'],
    timing: { before: 60 }, // 1 hour
  },
  {
    id: 'order_confirmation',
    name: 'Order Confirmation',
    type: 'confirmation',
    channels: ['sms', 'whatsapp', 'email'],
    template: {
      en: 'Thank you {{customerName}}! Your order #{{orderId}} has been confirmed. Services: {{services}}. Total: {{total}} SAR. Technician will arrive on {{appointmentDate}}.',
      ar: 'شكراً {{customerName}}! تم تأكيد طلبك #{{orderId}}. الخدمات: {{services}}. الإجمالي: {{total}} ريال. سيصل الفني في {{appointmentDate}}.',
    },
    variables: ['customerName', 'orderId', 'services', 'total', 'appointmentDate'],
  },
  {
    id: 'technician_on_way',
    name: 'Technician On The Way',
    type: 'status_update',
    channels: ['sms', 'whatsapp'],
    template: {
      en: 'Hi {{customerName}}, {{technicianName}} is on the way to your location. ETA: {{eta}} minutes. Track live: {{trackingLink}}',
      ar: 'مرحباً {{customerName}}، {{technicianName}} في الطريق إلى موقعك. الوصول المتوقع: {{eta}} دقيقة. تتبع مباشر: {{trackingLink}}',
    },
    variables: ['customerName', 'technicianName', 'eta', 'trackingLink'],
  },
  {
    id: 'service_completed',
    name: 'Service Completed',
    type: 'completion',
    channels: ['sms', 'whatsapp', 'email'],
    template: {
      en: 'Great! {{serviceName}} has been completed by {{technicianName}}. Amount paid: {{amount}} SAR. Please rate your experience: {{ratingLink}}',
      ar: 'ممتاز! تم إكمال {{serviceName}} بواسطة {{technicianName}}. المبلغ المدفوع: {{amount}} ريال. يرجى تقييم تجربتك: {{ratingLink}}',
    },
    variables: ['serviceName', 'technicianName', 'amount', 'ratingLink'],
  },
  {
    id: 'feedback_request',
    name: 'Feedback Request',
    type: 'feedback',
    channels: ['sms', 'whatsapp'],
    template: {
      en: 'Hi {{customerName}}, how was your experience with NASAYIM CLEAN? Share your feedback: {{feedbackLink}}. Thank you!',
      ar: 'مرحباً {{customerName}}، كيف كانت تجربتك مع نسائم كلين؟ شارك ملاحظاتك: {{feedbackLink}}. شكراً!',
    },
    variables: ['customerName', 'feedbackLink'],
  },
];

export function getTemplate(templateId: string): NotificationTemplate | undefined {
  return notificationTemplates.find(t => t.id === templateId);
}

export function interpolateTemplate(template: string, variables: Record<string, string>): string {
  let result = template;
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  return result;
}
