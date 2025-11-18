'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          {t('center.centerNotFound')}
        </h1>
        <p className="text-gray-600">{t('center.centerNotExists')}</p>
        <Link
          href="/"
          className="mt-4 inline-block cursor-pointer text-blue-600 hover:text-blue-700"
        >
          {t('center.backToHome')}
        </Link>
      </div>
    </div>
  );
}

