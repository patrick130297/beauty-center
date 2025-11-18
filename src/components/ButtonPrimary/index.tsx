import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export function ButtonPrimary({
  children,
  fullWidth = false,
  ...props
}: ButtonPrimaryProps) {
  return (
    <Button variant="primary" fullWidth={fullWidth} {...props}>
      {children}
    </Button>
  );
}

