import { cache } from 'react';
import type { Center } from '@/types';

const mockCenters: Record<string, Center> = {
  center1: {
    id: 'center1',
    name: 'centers.center1.name',
    description: 'centers.center1.description',
    services: [
      {
        id: 'service1',
        name: 'centers.center1.services.service1.name',
        duration: 60,
        price: 80,
        description: 'centers.center1.services.service1.description',
      },
      {
        id: 'service2',
        name: 'centers.center1.services.service2.name',
        duration: 120,
        price: 200,
        description: 'centers.center1.services.service2.description',
      },
      {
        id: 'service3',
        name: 'centers.center1.services.service3.name',
        duration: 90,
        price: 60,
        description: 'centers.center1.services.service3.description',
      },
      {
        id: 'service4',
        name: 'centers.center1.services.service4.name',
        duration: 75,
        price: 150,
        description: 'centers.center1.services.service4.description',
      },
    ],
  },
  center2: {
    id: 'center2',
    name: 'centers.center2.name',
    description: 'centers.center2.description',
    services: [
      {
        id: 'service5',
        name: 'centers.center2.services.service5.name',
        duration: 60,
        price: 120,
        description: 'centers.center2.services.service5.description',
      },
      {
        id: 'service6',
        name: 'centers.center2.services.service6.name',
        duration: 90,
        price: 180,
        description: 'centers.center2.services.service6.description',
      },
    ],
  },
};

function getCenterData(centerSlug: string): Center | null {
  return mockCenters[centerSlug] || null;
}

export const getCenter = cache(async (centerSlug: string): Promise<Center | null> => {
  return getCenterData(centerSlug);
});

export { getCenterData };

