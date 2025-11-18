'use client';

import type { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function FormInput({ error, className = '', ...props }: FormInputProps) {
  return (
    <input
      className={`mt-1 w-full rounded-md border px-3 py-2 text-gray-900 ${
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      } focus:outline-none focus:ring-2 ${className}`}
      {...props}
    />
  );
}

