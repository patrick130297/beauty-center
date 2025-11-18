'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './config';
import { LocalStorageKey, DefaultValue } from '@/constants';

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(LocalStorageKey.LANGUAGE) || DefaultValue.DEFAULT_LANGUAGE;
      i18n.changeLanguage(savedLanguage);
      
      if (!document.cookie.includes(`${LocalStorageKey.LANGUAGE}=`)) {
        document.cookie = `${LocalStorageKey.LANGUAGE}=${savedLanguage}; path=/; max-age=31536000; SameSite=Lax`;
      }
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

