import emailjs from '@emailjs/browser';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends a form submission through EmailJS. Every field is passed to the
 * template as a variable (e.g. {{full_name}}), alongside `form_type` and a
 * pre-formatted `message` so a single template can serve every form.
 */
export async function sendFormEmail(
  formType: string,
  fields: Record<string, string>,
  replyTo?: string
): Promise<void> {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured. Set the VITE_EMAILJS_* variables in .env.');
  }

  const message = Object.entries(fields)
    .map(([key, value]) => `${key}: ${value || '-'}`)
    .join('\n');

  await emailjs.send(
    serviceId,
    templateId,
    { ...fields, form_type: formType, subject: formType, message, reply_to: replyTo ?? '' },
    { publicKey }
  );
}
