import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function PulmonologyIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M10 3v2a4 4 0 0 0 4 4a4 4 0 0 0 4-4V3h2v2a6 6 0 0 1-6 6a6 6 0 0 1-6-6V3m1-1C8.36 2 6 4.07 6 6.5V11l-3 4.95A1 1 0 0 0 4 17.5V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1.55L18 11V6.5C18 4.07 15.64 2 13 2Z" />
    </svg>
  );
}
