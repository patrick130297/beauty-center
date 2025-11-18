'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocalStorageKey, BookingPrefix, DefaultValue } from '@/constants';
import { createBookingSchema, type BookingFormData } from './form-validation';
import { generateTimeSlots } from './timeSlots';
import { FormField } from '@/components/FormField';
import { FormInput } from '@/components/FormInput';
import { FormSelect } from '@/components/FormSelect';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { ButtonSecondary } from '@/components/ButtonSecondary';

interface BookingFormProps {
  centerId: string;
  serviceId: string;
  serviceName: string;
  onCancel: () => void;
}

export function BookingForm({
  centerId,
  serviceId,
  serviceName,
  onCancel,
}: BookingFormProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(createBookingSchema(t)),
    defaultValues: {
      name: '',
      email: '',
      date: '',
      time: '',
    },
  });

  function onSubmit(data: BookingFormData) {
    const now = new Date();
    const timestamp = now.getTime();
    const booking = {
      id: `${BookingPrefix.ID}${timestamp}`,
      centerId,
      serviceId,
      serviceName,
      clientName: data.name,
      clientEmail: data.email,
      date: data.date,
      time: data.time,
      createdAt: now.toISOString(),
    };

    try {
      const existingBookings = JSON.parse(
        localStorage.getItem(LocalStorageKey.BOOKINGS) || DefaultValue.EMPTY_ARRAY
      );
      existingBookings.push(booking);
      localStorage.setItem(LocalStorageKey.BOOKINGS, JSON.stringify(existingBookings));

      router.push(`/${centerId}/confirm?bookingId=${booking.id}`);
    } catch {
    }
  }

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && !isSubmitting) {
        onCancel();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSubmitting, onCancel]);

  const timeSlots = generateTimeSlots();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-form-title"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 id="booking-form-title" className="mb-4 text-2xl font-bold text-gray-900">
          {t('booking.title')}: {t(serviceName)}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            id="name"
            label={t('common.name')}
            required
            error={errors.name?.message}
          >
            <FormInput
              type="text"
              id="name"
              {...register('name')}
              error={!!errors.name}
            />
          </FormField>

          <FormField
            id="email"
            label={t('common.email')}
            required
            error={errors.email?.message}
          >
            <FormInput
              type="email"
              id="email"
              {...register('email')}
              error={!!errors.email}
            />
          </FormField>

          <FormField
            id="date"
            label={t('common.date')}
            required
            error={errors.date?.message}
          >
            <FormInput
              type="date"
              id="date"
              {...register('date')}
              min={new Date().toISOString().split('T')[0]}
              error={!!errors.date}
            />
          </FormField>

          <FormField
            id="time"
            label={t('common.time')}
            required
            error={errors.time?.message}
          >
            <FormSelect id="time" {...register('time')} error={!!errors.time}>
              <option value="">{t('booking.selectTime')}</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </FormSelect>
          </FormField>

          <div className="flex gap-3 pt-4">
            <ButtonSecondary
              type="button"
              onClick={onCancel}
              fullWidth
              disabled={isSubmitting}
            >
              {t('common.cancel')}
            </ButtonSecondary>
            <ButtonPrimary type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? t('booking.confirming') : t('booking.confirm')}
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
}

