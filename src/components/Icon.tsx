import type { ReactNode, SVGProps } from "react";

/* Stroke-based 24px icon set. Decorative by default (aria-hidden); pass a
   `label` to expose an accessible name. Colours follow `currentColor`. */

const PATHS = {
  home: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10.3V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8.7" />
      <path d="M9.5 20v-5.5h5V20" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  message: (
    <path d="M20 15a2 2 0 0 1-2 2H8l-4 3.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  heart: (
    <path d="M12 20S3.5 14.5 3.5 8.9C3.5 6.2 5.6 4.3 8 4.3c1.7 0 3.1.9 4 2.3.9-1.4 2.3-2.3 4-2.3 2.4 0 4.5 1.9 4.5 4.6C20.5 14.5 12 20 12 20z" />
  ),
  "heart-fill": (
    <path
      d="M12 20S3.5 14.5 3.5 8.9C3.5 6.2 5.6 4.3 8 4.3c1.7 0 3.1.9 4 2.3.9-1.4 2.3-2.3 4-2.3 2.4 0 4.5 1.9 4.5 4.6C20.5 14.5 12 20 12 20z"
      fill="currentColor"
      stroke="none"
    />
  ),
  star: (
    <path d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />
  ),
  "star-fill": (
    <path
      d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4.1-4 5.7-.8z"
      fill="currentColor"
      stroke="none"
    />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  shield: (
    <path d="M12 3l7 3v5c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6z" />
  ),
  "shield-check": (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6z" />
      <path d="M9 11.5l2 2 4-4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v9H3z" />
      <path d="M14 9h3.5L21 12.5V15h-7z" />
      <circle cx="7" cy="17.5" r="1.7" />
      <circle cx="17.5" cy="17.5" r="1.7" />
    </>
  ),
  box: (
    <>
      <path d="M21 8 12 3 3 8l9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  "chevron-right": <path d="M9.5 5.5 16 12l-6.5 6.5" />,
  "chevron-left": <path d="M14.5 5.5 8 12l6.5 6.5" />,
  "chevron-down": <path d="M5.5 9.5 12 16l6.5-6.5" />,
  "arrow-left": (
    <>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="M5 12.5 10 17l9-10.5" />,
  sliders: (
    <>
      <path d="M4 8h16M4 16h16" />
      <circle cx="9" cy="8" r="2.4" fill="var(--surface)" />
      <circle cx="15" cy="16" r="2.4" fill="var(--surface)" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.4 4 7 7 0 1 0 20 14.5z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
    </>
  ),
  send: (
    <>
      <path d="M21.5 2.5 11 13" />
      <path d="M21.5 2.5 15 21l-4-8.5L2.5 8.5z" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.2" />
      <circle cx="12" cy="7.7" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2.2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 2 5.5 2 5.5H4s2-1 2-5.5z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  swap: (
    <>
      <path d="M4 9h13" />
      <path d="M13 5l4 4-4 4" />
      <path d="M20 15H7" />
      <path d="M11 11l-4 4 4 4" />
    </>
  ),
  tool: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.7-3.7a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 1 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
  ),
  tent: (
    <>
      <path d="M12 5 3.5 20h17z" />
      <path d="M12 5v15" />
      <path d="M12 20l-4.5-5M12 20l4.5-5" />
    </>
  ),
  party: (
    <>
      <path d="M4 20l4.5-12L17 16.5z" />
      <path d="M14 4.5l.8-1M17 7l1.2-.5M16.5 10.8l1.4.1M19.5 4.2l-1 1" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="12.5" rx="2.6" />
      <path d="M8.2 7l1.4-2.2h4.8L15.8 7" />
      <circle cx="12" cy="13.2" r="3.4" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="16.5" r="3.4" />
      <circle cx="18" cy="16.5" r="3.4" />
      <path d="M6 16.5l4-7.5h4.5l-2.5 7.5M10 9l-1.5-2.5H6M14.5 9l3.5 7.5" />
    </>
  ),
  stroller: (
    <>
      <path d="M5 6h2.5l1.8 8H19a7 7 0 0 0-14-8z" />
      <path d="M12 6.5v7.5" />
      <circle cx="9.5" cy="18.5" r="1.7" />
      <circle cx="16.5" cy="18.5" r="1.7" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C3.8 12 7.5 4.8 20 4c1 12.5-6 16-14 15z" />
      <path d="M5.5 18.5 14 10" />
    </>
  ),
  tag: (
    <>
      <path d="M3 11.6V4.6A1.6 1.6 0 0 1 4.6 3h7l9.4 9.4-8 8z" />
      <circle cx="7.6" cy="7.6" r="1.3" />
    </>
  ),
  dollar: (
    <>
      <path d="M12 3v18" />
      <path d="M16 7.2C16 5.4 14.2 4.3 12 4.3S8 5.4 8 7.2s1.8 2.6 4 3 4 1.2 4 3-1.8 2.9-4 2.9-4-1.1-4-2.9" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.4" />
      <circle cx="8.5" cy="10" r="1.7" />
      <path d="M5 17.5l4.6-4.2 3 2.6L16 12l3.5 4" />
    </>
  ),
  dots: (
    <>
      <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  edit: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16z" />
      <path d="M14 6l4 4" />
    </>
  ),
  logout: (
    <>
      <path d="M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3" />
      <path d="M10 12H3m0 0 4-4m-4 4 4 4" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  label?: string;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 24,
  label,
  strokeWidth = 2,
  ...rest
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
