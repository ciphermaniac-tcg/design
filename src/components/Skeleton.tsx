import type { JSX } from 'solid-js';

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  inline?: boolean;
  style?: JSX.CSSProperties;
}

/**
 * Generic loading skeleton block, a still surface-2 fill that blends with the page.
 */
export function Skeleton(props: SkeletonProps) {
  return (
    <span
      class='skeleton'
      classList={{ 'skeleton-block': !props.inline }}
      style={{
        width: props.width ?? '100%',
        height: props.height ?? '14px',
        'border-radius': props.rounded ?? 'var(--radius-sm)',
        ...props.style
      }}
      aria-hidden='true'
    />
  );
}
