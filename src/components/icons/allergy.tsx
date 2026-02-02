import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function AllergyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn(props.className)}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 18a6 6 0 0 0 6-6h-6V6a6 6 0 1 0-6 6" />
    </svg>
  );
}
