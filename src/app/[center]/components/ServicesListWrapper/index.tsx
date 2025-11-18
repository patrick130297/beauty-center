'use client';

import { useState } from 'react';
import type { Service, Center } from '@/types';
import { ServicesList } from '../ServicesList';
import { BookingForm } from '@/components/BookingForm';

interface ServicesListWrapperProps {
  center: Center;
  services: Service[];
}

export function ServicesListWrapper({ center, services }: ServicesListWrapperProps) {
  const [selectedService, setSelectedService] = useState<{
    id: string;
    name: string;
  } | null>(null);

  function handleBookService(serviceId: string) {
    const service = center.services.find((s) => s.id === serviceId);
    if (service) {
      setSelectedService({ id: service.id, name: service.name });
    }
  }

  function handleCancelBooking() {
    setSelectedService(null);
  }

  return (
    <>
      <ServicesList services={services} onBook={handleBookService} />
      {selectedService && (
        <BookingForm
          centerId={center.id}
          serviceId={selectedService.id}
          serviceName={selectedService.name}
          onCancel={handleCancelBooking}
        />
      )}
    </>
  );
}

