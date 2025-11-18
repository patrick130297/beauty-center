'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { ButtonLink } from '@/components/ButtonLink';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const { t } = useTranslation();

  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          {t('center.errorTitle')}
        </h1>
        <p className="mb-2 text-gray-600">{t('center.errorMessage')}</p>
        {error.digest && (
          <p className="mb-6 text-sm text-gray-500">
            {t('center.errorDigest')}: {error.digest}
          </p>
        )}
        <div className="mt-6 flex justify-center gap-4">
          <ButtonPrimary onClick={reset}>
            {t('common.tryAgain')}
          </ButtonPrimary>
          <ButtonLink href="/" variant="secondary">
            {t('center.backToHome')}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

