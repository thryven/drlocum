// src/components/icons/category-icon.tsx
import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

// This component contains the SVG path data for all custom category icons.
// It renders the correct icon based on the `name` prop.

interface CategoryIconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

const iconPaths: Record<string, React.ReactNode> = {
  immunology: (
    <>
      <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
  'dew_point': (
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  ),
  pulmonology: (
    <path d="M10 3v2a4 4 0 0 0 4 4a4 4 0 0 0 4-4V3h2v2a6 6 0 0 1-6 6a6 6 0 0 1-6-6V3m1-1C8.36 2 6 4.07 6 6.5V11l-3 4.95A1 1 0 0 0 4 17.5V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1.55L18 11V6.5C18 4.07 15.64 2 13 2Z" />
  ),
  gastroenterology: (
    <>
      <path d="M19 12a7 7 0 1 0-14 0a7 7 0 1 0 14 0"/>
      <path d="M12 7a1 1 0 0 0-1-1c-1.36 0-4 2.33-4 6 0 2.2 1.8 4 4 4h2a2 2 0 0 0 2-2c0-1.11-.9-2-2-2"/>
      <path d="M11 4a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0V5a1 1 0 0 0-1-1"/>
    </>
  ),
  allergy: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 18a6 6 0 0 0 6-6h-6V6a6 6 0 1 0-6 6" />
    </>
  ),
  humerus_alt: (
    <>
      <circle cx="5" cy="5" r="2" />
      <path d="m6.5 6.5 11 11" />
      <circle cx="19" cy="19" r="2" />
    </>
  ),
};

export function CategoryIcon({ name, className, ...props }: CategoryIconProps) {
  const path = iconPaths[name];

  if (!path) {
    return null; // Or return a default fallback icon
  }

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
      className={cn(className)}
    >
      {path}
    </svg>
  );
}
