import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';

interface ButtonSecondaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export function ButtonSecondary({
  children,
  fullWidth = false,
  ...props
}: ButtonSecondaryProps) {
  return (
    <Button variant="secondary" fullWidth={fullWidth} {...props}>
      {children}
    </Button>
  );
}

