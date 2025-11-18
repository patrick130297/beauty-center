import Link from 'next/link';
import { getTranslations, t } from '@/lib/i18n-server';

export const revalidate = 900;

export default async function Home() {
  const translations = await getTranslations();
  
  const centers = [
    {
      slug: 'center1',
      nameKey: 'centers.center1.name',
      descriptionKey: 'centers.center1.description',
    },
    {
      slug: 'center2',
      nameKey: 'centers.center2.name',
      descriptionKey: 'centers.center2.description',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {t('home.title', translations)}
          </h1>
          <p className="text-lg text-gray-600">
            {t('home.subtitle', translations)}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {centers.map((center) => (
            <Link
              key={center.slug}
              href={`/${center.slug}`}
              prefetch
              className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <h2 className="mb-2 text-2xl font-semibold text-gray-900 group-hover:text-blue-600">
                {t(center.nameKey, translations)}
              </h2>
              <p className="text-gray-600">{t(center.descriptionKey, translations)}</p>
              <div className="mt-4 text-blue-600 group-hover:text-blue-700">
                {t('home.viewServices', translations)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
