'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  className = '',
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-lg border border-slate-200 shadow-sm
        ${paddingStyles[padding]} ${className}
      `}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 pb-4 border-b border-slate-200 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

export function CardTitle({
  children,
  as: Component = 'h3',
  className = '',
}: CardTitleProps) {
  return (
    <Component
      className={`text-lg font-semibold text-slate-950 ${className}`}
    >
      {children}
    </Component>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`text-slate-700 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-slate-200 ${className}`}>
      {children}
    </div>
  );
}
