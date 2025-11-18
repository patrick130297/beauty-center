'use client';

import type { SelectHTMLAttributes } from 'react';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function FormSelect({ error, className = '', children, ...props }: FormSelectProps) {
  return (
    <select
      className={`mt-1 w-full rounded-md border px-3 py-2 text-gray-900 ${
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      } focus:outline-none focus:ring-2 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

