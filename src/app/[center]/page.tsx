import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCenter } from '@/lib/centers';
import { getTranslations, t } from '@/lib/i18n-server';
import { CenterHeader } from './components/CenterHeader';
import { ServicesHeader } from './components/ServicesHeader';
import { ServicesListWrapper } from './components/ServicesListWrapper';
import { EmptyServices } from './components/EmptyServices';

export const revalidate = 900;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ center: string }>;
}): Promise<Metadata> {
  const { center: centerSlug } = await params;
  const center = await getCenter(centerSlug);

  if (!center) {
    return {
      title: 'Center Not Found - Booking System',
      description: 'The requested center does not exist.',
    };
  }

  const translations = await getTranslations();
  const centerName = t(center.name, translations);
  const centerDescription = t(center.description, translations);

  return {
    title: `${centerName} - Booking System`,
    description: centerDescription,
    openGraph: {
      title: `${centerName} - Book Your Appointment`,
      description: centerDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: centerName,
      description: centerDescription,
    },
  };
}

export default async function CenterPage({
  params,
}: {
  params: Promise<{ center: string }>;
}) {
  const { center: centerSlug } = await params;
  const center = await getCenter(centerSlug);

  // notFound() automaticamente chama not-found.tsx
  if (!center) {
    notFound();
  }

  const hasServices = center.services && center.services.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <CenterHeader center={center} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ServicesHeader />

        {hasServices ? (
          <ServicesListWrapper center={center} services={center.services} />
        ) : (
          <EmptyServices />
        )}
      </main>
    </div>
  );
}
