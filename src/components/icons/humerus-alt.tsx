import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function HumerusAltIcon(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="5" cy="5" r="2" />
      <path d="m6.5 6.5 11 11" />
      <circle cx="19" cy="19" r="2" />
    </svg>
  );
}
