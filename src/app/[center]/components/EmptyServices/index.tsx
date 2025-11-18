'use client';

import { useTranslation } from 'react-i18next';

export function EmptyServices() {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg bg-white p-8 text-center shadow-sm">
      <p className="text-gray-600">{t('center.noServices')}</p>
    </div>
  );
}

