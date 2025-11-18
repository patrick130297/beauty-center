import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import ptTranslations from './locales/pt.json';
import { Language } from '@/constants';

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        [Language.EN]: {
          translation: enTranslations,
        },
        [Language.PT]: {
          translation: ptTranslations,
        },
      },
      lng: Language.EN,
      fallbackLng: Language.EN,
      defaultNS: 'translation',
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;

