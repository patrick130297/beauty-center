'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { Center } from '@/types';

interface CenterHeaderProps {
  center: Center;
}

export function CenterHeader({ center }: CenterHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-4 inline-flex cursor-pointer items-center text-blue-600 hover:text-blue-700"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {t('common.back')}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{t(center.name)}</h1>
        <p className="mt-2 text-gray-600">{t(center.description)}</p>
      </div>
    </header>
  );
}

