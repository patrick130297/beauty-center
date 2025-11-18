'use client';

import { useTranslation } from 'react-i18next';
import type { Service } from '@/types';
import { Locale } from '@/constants';
import { ButtonPrimary } from '@/components/ButtonPrimary';

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  const { t } = useTranslation();

  function formatPrice(price: number): string {
    return new Intl.NumberFormat(Locale.PT_BR, {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }

  function formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} ${t('service.min')}`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours}${t('service.h')}`;
    }
    return `${hours}${t('service.h')} ${mins}${t('service.min')}`;
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        {t(service.name)}
      </h3>
      <p className="mb-4 flex-1 text-gray-600">{t(service.description)}</p>
      <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
        <span>⏱️ {formatDuration(service.duration)}</span>
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(service.price)}
        </span>
      </div>
      <ButtonPrimary onClick={() => onBook(service.id)} fullWidth>
        {t('service.book')}
      </ButtonPrimary>
    </div>
  );
}

