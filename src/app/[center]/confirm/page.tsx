'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import type { Booking } from '@/types';
import { LocalStorageKey, DefaultValue, Language } from '@/constants';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { ButtonSecondary } from '@/components/ButtonSecondary';
import { formatDate, formatTime } from '@/utils/date';

export default function ConfirmPage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const centerSlug = params.center as string;
  const bookingId = searchParams.get('bookingId');
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!bookingId) {
      router.push(`/${centerSlug}`);
      return;
    }

    function loadBooking() {
      try {
        const bookings = JSON.parse(
          localStorage.getItem(LocalStorageKey.BOOKINGS) || DefaultValue.EMPTY_ARRAY
        );
        const foundBooking = bookings.find(
          (b: Booking) => b.id === bookingId && b.centerId === centerSlug
        );

        if (foundBooking) {
          setBooking(foundBooking);
        } else {
          router.push(`/${centerSlug}`);
        }
      } catch {
        router.push(`/${centerSlug}`);
      }
    }

    loadBooking();
  }, [bookingId, centerSlug, router]);

  function handleBackToCenter() {
    router.push(`/${centerSlug}`);
  }

  function handleGoHome() {
    router.push('/');
  }

  if (!booking) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('confirmation.title')}
          </h1>
          <p className="mt-2 text-gray-600">
            {t('confirmation.subtitle')}
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            {t('confirmation.details')}
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('confirmation.service')}:</span>
              <span className="font-medium text-gray-900">
                {t(booking.serviceName)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('confirmation.client')}:</span>
              <span className="font-medium text-gray-900">
                {booking.clientName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('common.email')}:</span>
              <span className="font-medium text-gray-900">
                {booking.clientEmail}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('common.date')}:</span>
              <span className="font-medium text-gray-900">
                {formatDate(booking.date, i18n.language as Language)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('common.time')}:</span>
              <span className="font-medium text-gray-900">
                {formatTime(booking.time)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <ButtonPrimary onClick={handleBackToCenter} fullWidth>
            {t('confirmation.backToCenter')}
          </ButtonPrimary>
          <ButtonSecondary onClick={handleGoHome} fullWidth>
            {t('confirmation.homePage')}
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
