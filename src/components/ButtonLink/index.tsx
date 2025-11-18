import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

interface ButtonLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonLinkProps) {
  const baseStyle =
    'cursor-pointer rounded-md px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 inline-block text-center';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <Link
      href={href}
      className={`${baseStyle} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

