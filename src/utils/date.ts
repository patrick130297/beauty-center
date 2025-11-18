import { Language, Locale } from '@/constants';

export function formatDate(dateString: string, language: Language): string {
  const date = new Date(dateString);
  const locale = language === Language.PT ? Locale.PT_BR : Locale.EN_US;

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
}

