import { z } from 'zod';
import { isAfter, isSameDay, startOfDay } from 'date-fns';

export interface BookingFormData {
  name: string;
  email: string;
  date: string;
  time: string;
}

function parseInputDate(dateString: string): Date | null {
  const [year, month, day] = dateString.split('-').map(Number);

  if (
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  return new Date(year, month - 1, day);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function createBookingSchema(t: (key: string) => string) {
  return z
    .object({
      name: z.string().min(1, t('booking.nameRequired')).trim(),
    email: z
      .string()
      .min(1, t('booking.emailRequired'))
        .refine((value) => EMAIL_REGEX.test(value), {
          message: t('booking.emailInvalid'),
        })
      .trim(),
      date: z
        .string()
        .min(1, t('booking.dateRequired'))
        .refine(
          (date) => {
            const parsedDate = parseInputDate(date);
            if (!parsedDate) {
              return false;
            }

            const selectedDate = startOfDay(parsedDate);
            const today = startOfDay(new Date());

            return isAfter(selectedDate, today) || isSameDay(selectedDate, today);
          },
          { message: t('booking.dateFuture') }
        ),
      time: z
        .string()
        .min(1, t('booking.timeRequired'))
        .refine(
          (time) => {
            const [hours] = time.split(':');
            const hour = parseInt(hours, 10);
            return hour >= 9 && hour < 18;
          },
          { message: t('booking.timeBusinessHours') }
        ),
    })
    .superRefine((data, ctx) => {
      const parsedDate = parseInputDate(data.date);
      if (!parsedDate) {
        return;
      }

      const [hours, minutes] = data.time.split(':').map(Number);

      if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return;
      }

      const bookingDateTime = new Date(parsedDate);
      bookingDateTime.setHours(hours, minutes, 0, 0);

      if (bookingDateTime.getTime() < Date.now()) {
        ctx.addIssue({
          code: 'custom',
          message: t('booking.dateTimeFuture'),
          path: ['time'],
        });
      }
    });
}

