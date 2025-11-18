export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

export interface Center {
  id: string;
  name: string;
  description: string;
  logo?: string;
  services: Service[];
}

export interface Booking {
  id: string;
  centerId: string;
  serviceId: string;
  serviceName: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  createdAt: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  date: string;
  time: string;
}

