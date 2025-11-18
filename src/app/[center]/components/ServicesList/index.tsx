'use client';

import type { Service } from '@/types';
import { ServiceCard } from '@/components/ServiceCard';

interface ServicesListProps {
  services: Service[];
  onBook: (serviceId: string) => void;
}

export function ServicesList({ services, onBook }: ServicesListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} onBook={onBook} />
      ))}
    </div>
  );
}

