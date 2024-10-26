import React, { MouseEvent, ReactNode, memo } from 'react';
import { ButtonType } from '@/components/Button/type';
import { Spinner } from '@/components/Spinner';

interface ButtonProps {
  type?: ButtonType;
  label?: string | ReactNode;
  children?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  className?: string | string[];
}

export const Button = memo(function Button({
  type = 'button',
  label,
  children,
  isLoading,
  disabled,
  onClick,
  className,
}: ButtonProps) {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <button
      className={`
        text-white text-sm 
        bg-blue-700
        font-medium rounded-lg 
        px-5 py-2.5 me-2 mb-2
        dark:bg-blue-600
        focus:ring-4 focus:ring-blue-300 
        hover:bg-blue-800 dark:focus:ring-blue-80 dark:hover:bg-blue-700
        focus:outline-none ${Array.isArray(className) ? className.join(' ') : className}`}
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
