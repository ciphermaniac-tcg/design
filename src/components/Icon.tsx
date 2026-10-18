/**
 * The one icon set both sites draw from: a 24px grid, a 1.5px stroke, round
 * caps and joins, drawn at 16px or 20px in the colour of the text around it.
 * Every glyph is a single path so the set stays one shape language; a new icon
 * is added here rather than drawn inline on a page.
 * @module components/Icon
 */

const PATHS = {
  search: 'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M20 20l-4-4',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-up': 'M6 15l6-6 6 6',
  'chevron-left': 'M15 6l-6 6 6 6',
  'chevron-right': 'M9 6l6 6-6 6',
  close: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12.5l4.5 4.5L19 7',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  more: 'M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0M18 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  download: 'M12 4v11M7 10l5 5 5-5M4 20h16',
  upload: 'M12 16V5M7 10l5-5 5 5M4 20h16',
  info: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 11v5M12 8v.01',
  alert: 'M12 3l10 18H2zM12 10v5M12 18v.01',
  calendar: 'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 10h18M8 3v4M16 3v4',
  filter: 'M4 6h16M7 12h10M10 18h4',
  pin: 'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5',
  locate: 'M12 2v3M12 19v3M2 12h3M19 12h3M12 6a6 6 0 1 0 0 12a6 6 0 1 0 0-12',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  list: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',
  copy: 'M9 9h10v10H9zM15 9V5H5v10h4',
  link: 'M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1',
  edit: 'M4 20h4L19 9l-4-4L4 16z',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  refresh: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7',
  users: 'M9 4a4 4 0 1 0 0 8a4 4 0 1 0 0-8M2 21c0-4 3-7 7-7s7 3 7 7M16 4a4 4 0 0 1 0 8M22 21c0-3-2-5-4-6',
  trophy: 'M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8'
} as const;

export type IconName = keyof typeof PATHS;

/** Every icon in the set, in drawing order: for a specimen sheet or a picker. */
export const ICON_NAMES = Object.keys(PATHS) as IconName[];

interface IconProps {
  name: IconName;
  /** 16 beside data-size text, 20 beside headings and in bars. */
  size?: 16 | 20;
  /** Names an icon that stands alone; without it the icon is decoration and hidden from assistive tech. */
  label?: string;
  class?: string;
}

export function Icon(props: IconProps) {
  return (
    <svg
      class={props.class ? `icon ${props.class}` : 'icon'}
      viewBox='0 0 24 24'
      width={props.size ?? 16}
      height={props.size ?? 16}
      fill='none'
      stroke='currentColor'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
      role={props.label ? 'img' : undefined}
      aria-label={props.label}
      aria-hidden={props.label ? undefined : 'true'}
    >
      <path d={PATHS[props.name]} />
    </svg>
  );
}
