'use client';

import { useTranslation } from 'react-i18next';

export function ServicesHeader() {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900">
        {t('center.ourServices')}
      </h2>
      <p className="mt-2 text-gray-600">{t('center.chooseService')}</p>
    </div>
  );
}

