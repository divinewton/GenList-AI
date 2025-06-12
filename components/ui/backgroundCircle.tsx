import React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundCircle {
  className?: string;
}

const BackgroundBlurCircle: React.FC<BackgroundCircle> = ({ className }) => {
  return (
    <>
    <div
      className={cn(
        'fixed -z-10 rounded-full bg-[color:var(--circle1)] blur-3xl',
        'w-[400px] h-[400px]',
        '-top-60 -left-20',
        className 
      )}
      aria-hidden="true"
    />
    <div
      className={cn(
        'fixed -z-10 rounded-full bg-[color:var(--circle2)] blur-3xl',
        'w-[700px] h-[700px]',
        'top-100 left-200',
        className 
      )}
      aria-hidden="true"
    />
    </>
  );
};

export default BackgroundBlurCircle;