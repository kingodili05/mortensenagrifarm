// Lightweight inline icon set (no icon-library dependency).
// Decorative by default (aria-hidden); pass a title for meaningful icons.

type IconProps = {
  className?: string;
  title?: string;
};

function base(title?: string) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": title ? undefined : true,
    role: title ? ("img" as const) : undefined,
  };
}

export function PlusIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function XIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function SearchIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function LeafIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16Z" />
      <path d="M11 20c0-4 2-8 6-11" />
    </svg>
  );
}

export function GearIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

export function FlaskIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" />
      <path d="M7.5 14h9" />
    </svg>
  );
}

export function GlobeIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 5.6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.6-4-9s1.5-6.5 4-9Z" />
    </svg>
  );
}

export function TagIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  );
}

export function HeadsetIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2Z" />
      <path d="M20 17v1a3 3 0 0 1-3 3h-3" />
    </svg>
  );
}

export function CheckIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ArrowRightIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MapPinIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function MailIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function PhoneIcon({ className, title }: IconProps) {
  return (
    <svg {...base(title)} className={className}>
      {title && <title>{title}</title>}
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

const ICONS = {
  leaf: LeafIcon,
  gear: GearIcon,
  flask: FlaskIcon,
  globe: GlobeIcon,
  tag: TagIcon,
  headset: HeadsetIcon,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className,
  title,
}: {
  name: IconName;
  className?: string;
  title?: string;
}) {
  const Cmp = ICONS[name];
  return <Cmp className={className} title={title} />;
}
