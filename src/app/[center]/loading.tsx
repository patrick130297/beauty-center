'use client';

import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div
          className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
          role="status"
          aria-label={t('center.loading')}
        >
          <span className="sr-only">{t('center.loading')}</span>
        </div>
        <p className="text-gray-600">{t('center.loading')}</p>
      </div>
    </div>
  );
}

