const ICONS = {
  search: (
    <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
  ),
  bell: (
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
  ),
  close: (
    <path d="M18 6L6 18M6 6l12 12" />
  ),
  plus: (
    <path d="M12 5v14M5 12h14" />
  ),
  chevronRight: (
    <path d="M9 18l6-6-6-6" />
  ),
  check: (
    <path d="M20 6L9 17l-5-5" />
  ),
  menu: (
    <path d="M3 12h18M3 6h18M3 18h18" />
  ),
  user: (
    <g>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </g>
  ),
  book: (
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
  ),
  cpu: (
    <g>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
    </g>
  ),
  code: (
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  ),
  sparkles: (
    <path d="M12 3l1.91 5.09L19 10l-5.09 1.91L12 17l-1.91-5.09L5 10l5.09-1.91zM5 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 17l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
  ),
  shield: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  ),
  arrowUpRight: (
    <path d="M7 17L17 7M7 7h10v10" />
  ),
  ticket: (
    <path d="M2 9a3 3 0 0 1 0 6v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a3 3 0 0 1 0-6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM9 2v20" />
  ),
  swap: (
    <path d="M16 3l4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16" />
  ),
}

export default function Icon({ name, size = 16, color = 'currentColor', className = '', ...props }) {
  const svgContent = ICONS[name]
  if (!svgContent) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon icon-${name} ${className}`}
      aria-hidden="true"
      {...props}
    >
      {svgContent}
    </svg>
  )
}
