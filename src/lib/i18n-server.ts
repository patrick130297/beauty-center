import { headers, cookies } from 'next/headers';
import enTranslations from '@/i18n/locales/en.json';
import ptTranslations from '@/i18n/locales/pt.json';
import { Language, LocalStorageKey } from '@/constants';

type Translations = typeof enTranslations;

async function getLanguageFromRequest(): Promise<string> {
  const headersList = await headers();
  const cookieStore = await cookies();
  
  const languageCookie = cookieStore.get(LocalStorageKey.LANGUAGE);
  
  if (languageCookie?.value === Language.PT || languageCookie?.value === Language.EN) {
    return languageCookie.value;
  }
  
  const acceptLanguage = headersList.get('accept-language');
  
  if (acceptLanguage?.includes('pt')) {
    return Language.PT;
  }
  
  return Language.EN;
}

export async function getTranslations(lang?: string): Promise<Translations> {
  const language = lang || await getLanguageFromRequest();
  
  if (language === Language.PT) {
    return ptTranslations as Translations;
  }
  
  return enTranslations;
}

type TranslationValue = string | { [key: string]: TranslationValue };

function getNestedValue(
  obj: TranslationValue,
  keys: string[]
): string | undefined {
  if (keys.length === 0) {
    return typeof obj === 'string' ? obj : undefined;
  }

  const [firstKey, ...restKeys] = keys;

  if (typeof obj === 'object' && obj !== null && firstKey in obj) {
    return getNestedValue(obj[firstKey], restKeys);
  }

  return undefined;
}

export function t(key: string, translations: Translations): string {
  const keys = key.split('.');
  const value = getNestedValue(translations, keys);
  
  return value ?? key;
}

