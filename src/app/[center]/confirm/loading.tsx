'use client';

import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div
          className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
          role="status"
          aria-label={t('confirmation.loading')}
        >
          <span className="sr-only">{t('confirmation.loading')}</span>
        </div>
        <p className="text-gray-600">{t('confirmation.loading')}</p>
      </div>
    </div>
  );
}

