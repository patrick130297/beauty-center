'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { LocalStorageKey, Language } from '@/constants';

export function LanguageSelector() {
  const { i18n: i18nInstance } = useTranslation();
  const router = useRouter();

  function changeLanguage(lng: string) {
    i18nInstance.changeLanguage(lng);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LocalStorageKey.LANGUAGE, lng);
      
      document.cookie = `${LocalStorageKey.LANGUAGE}=${lng}; path=/; max-age=31536000; SameSite=Lax`;
      
      router.refresh();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage(Language.EN)}
        className={`cursor-pointer px-3 py-1 rounded text-sm font-medium transition-colors ${
          i18nInstance.language === Language.EN
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage(Language.PT)}
        className={`cursor-pointer px-3 py-1 rounded text-sm font-medium transition-colors ${
          i18nInstance.language === Language.PT
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        PT
      </button>
    </div>
  );
}

