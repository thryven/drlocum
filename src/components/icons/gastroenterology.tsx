import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function GastroenterologyIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M19 12a7 7 0 1 0-14 0a7 7 0 1 0 14 0"/>
      <path d="M12 7a1 1 0 0 0-1-1c-1.36 0-4 2.33-4 6 0 2.2 1.8 4 4 4h2a2 2 0 0 0 2-2c0-1.11-.9-2-2-2"/>
      <path d="M11 4a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0V5a1 1 0 0 0-1-1"/>
    </svg>
  );
}
