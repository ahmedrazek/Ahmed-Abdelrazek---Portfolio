export type EmailConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

export function getEmailConfig(
  env: Record<string, string | undefined>
): EmailConfig | null {
  const serviceId = env.NEXT_PUBLIC_SERVICE_ID?.trim();
  const templateId = env.NEXT_PUBLIC_TEMPLATE_ID?.trim();
  const publicKey = env.NEXT_PUBLIC_PUBLIC_KEY?.trim();
  if (!serviceId || !templateId || !publicKey) return null;
  return { serviceId, templateId, publicKey };
}
