'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#c2410c] text-white hover:bg-[#9a3412] focus:ring-[#c2410c]/50',
  secondary:
    'bg-[#1e3a5f] text-white hover:bg-[#0f2440] focus:ring-[#1e3a5f]/50',
  outline:
    'bg-transparent text-[#1e3a5f] border-2 border-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white focus:ring-[#1e3a5f]/50',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500/50',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    fullWidth = false,
  } = props;

  const baseStyles = `
    inline-flex items-center justify-center font-semibold rounded-lg
    transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Link variant
  if ('href' in props && props.href) {
    const { href, external } = props;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseStyles}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  // Button variant
  const { type = 'button', disabled, onClick, ...rest } = props as ButtonAsButtonProps;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseStyles}
      {...rest}
    >
      {children}
    </button>
  );
}
