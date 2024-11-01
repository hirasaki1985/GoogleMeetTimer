import React, { MouseEvent, ReactNode, memo } from 'react';
import { ButtonType } from '@/components/atoms/Button/type';
import { Spinner } from '@/components/atoms/Spinner';
import { ButtonDesignPrimary } from '@/components/atoms/Button/ButtonDesign';

interface ButtonProps {
  type?: ButtonType;
  label?: string | ReactNode;
  children?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  design?: string;
  className?: string | string[];
}

export const Button = memo(function Button({
  type = 'button',
  label,
  children,
  isLoading,
  disabled,
  onClick,
  design = ButtonDesignPrimary,
  className,
}: ButtonProps) {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <button
      className={`${design} ${Array.isArray(className) ? className.join(' ') : className}`}
      type={type}
      onClick={(_e) => {
        if (onClick) onClick(_e);
      }}
      disabled={disabled}
    >
      {label ? label : children}
    </button>
  );
});
