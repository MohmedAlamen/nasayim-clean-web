import { getTemplate, interpolateTemplate } from '../../client/src/data/notificationTemplates';

export interface NotificationPayload {
  templateId: string;
  phoneNumber: string;
  variables: Record<string, string>;
  channels: ('sms' | 'whatsapp')[];
  language: 'en' | 'ar';
}

export interface NotificationResult {
  success: boolean;
  messageId?: string;
  channel: string;
  error?: string;
}

export async function sendSMS(phoneNumber: string, message: string): Promise<NotificationResult> {
  try {
    console.log(`[SMS] Sending to ${phoneNumber}: ${message}`);
    return {
      success: true,
      messageId: `sms_${Date.now()}`,
      channel: 'sms',
    };
  } catch (error) {
    console.error('[SMS Error]', error);
    return {
      success: false,
      channel: 'sms',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function sendWhatsApp(phoneNumber: string, message: string): Promise<NotificationResult> {
  try {
    console.log(`[WhatsApp] Sending to ${phoneNumber}: ${message}`);
    return {
      success: true,
      messageId: `wa_${Date.now()}`,
      channel: 'whatsapp',
    };
  } catch (error) {
    console.error('[WhatsApp Error]', error);
    return {
      success: false,
      channel: 'whatsapp',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function sendNotification(payload: NotificationPayload): Promise<NotificationResult[]> {
  const template = getTemplate(payload.templateId);
  
  if (!template) {
    throw new Error(`Template not found: ${payload.templateId}`);
  }

  const templateText = template.template[payload.language];
  const message = interpolateTemplate(templateText, payload.variables);

  const results: NotificationResult[] = [];

  for (const channel of payload.channels) {
    if (channel === 'sms') {
      const result = await sendSMS(payload.phoneNumber, message);
      results.push(result);
    } else if (channel === 'whatsapp') {
      const result = await sendWhatsApp(payload.phoneNumber, message);
      results.push(result);
    }
  }

  return results;
}

export async function scheduleNotification(
  payload: NotificationPayload,
  delayMinutes: number
): Promise<string> {
  const scheduledTime = new Date(Date.now() + delayMinutes * 60 * 1000);
  const jobId = `job_${Date.now()}`;
  
  console.log(`[Scheduled] Notification ${jobId} scheduled for ${scheduledTime.toISOString()}`);
  
  return jobId;
}
