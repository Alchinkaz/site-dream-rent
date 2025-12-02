export function normalizePhoneNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, '')
  
  // Remove leading 7 or 8 if it starts with them and is too long
  if ((cleaned.startsWith('7') || cleaned.startsWith('8')) && cleaned.length > 10) {
    cleaned = cleaned.substring(1)
  }
  
  // Ensure it starts with 7 (Kazakhstan country code)
  if (!cleaned.startsWith('7')) {
    cleaned = '7' + cleaned
  }
  
  return cleaned
}
