import { createEffect, createSignal, createUniqueId, type JSX, onCleanup } from 'solid-js';

/**
 * Small inline tooltip trigger. Renders a marker (asterisk by default) that
 * reveals a styled bubble on hover, keyboard focus, or tap. Used for caveats
 * and metric explanations where a full sentence would clutter the row.
 *
 * Tap support matters: on touch devices there is no hover, so without the
 * click toggle these notes simply didn't exist on phones. While open, the
 * bubble is clamped inside the viewport (near screen edges the centered
 * position used to push half the bubble offscreen) and closes on outside
 * tap or Escape.
 *
 * It is a toggle button: Enter, Space or a tap opens and closes it, and
 * `aria-expanded` says which. Escape dismisses the bubble however it was
 * shown, hover and keyboard focus included (WCAG 1.4.13); it comes back
 * once the pointer leaves or focus moves on.
 *
 * The `label` is exposed to assistive tech via `aria-label` so the note is
 * announced without needing to render the bubble visually.
 */
export function InfoTip(props: { children: JSX.Element; label?: string; marker?: JSX.Element; class?: string }) {
  const [open, setOpen] = createSignal(false);
  const [hovered, setHovered] = createSignal(false);
  const [dismissed, setDismissed] = createSignal(false);
  const [shift, setShift] = createSignal(0);
  const bubbleId = createUniqueId();
  const dismiss = () => {
    setOpen(false);
    setDismissed(true);
  };
  let root: HTMLSpanElement | undefined;
  let bubble: HTMLSpanElement | undefined;

  createEffect(() => {
    if (!open()) {
      setShift(0);
      return;
    }
    // Clamp after paint: measure where the centered bubble landed and nudge
    // it back inside the viewport if it hangs off either edge.
    requestAnimationFrame(() => {
      if (!bubble) {
        return;
      }
      const r = bubble.getBoundingClientRect();
      const pad = 8;
      if (r.left < pad) {
        setShift(pad - r.left);
      } else if (r.right > window.innerWidth - pad) {
        setShift(window.innerWidth - pad - r.right);
      }
    });
    const onDocPointer = (e: PointerEvent) => {
      if (root && e.target instanceof Node && !root.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onDocPointer);
    onCleanup(() => document.removeEventListener('pointerdown', onDocPointer));
  });

  // Escape reaches the bubble wherever it is showing from, focus or not.
  createEffect(() => {
    if (!open() && !hovered()) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss();
      }
    };
    document.addEventListener('keydown', onKey);
    onCleanup(() => document.removeEventListener('keydown', onKey));
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setDismissed(false);
      setOpen(!open());
    } else if (e.key === 'Escape') {
      dismiss();
    }
  };

  return (
    <span
      ref={root}
      class={props.class ? `info-tip ${props.class}` : 'info-tip'}
      classList={{ open: open(), dismissed: dismissed() }}
      tabindex='0'
      role='button'
      aria-label={props.label}
      aria-expanded={open() ? 'true' : 'false'}
      aria-describedby={bubbleId}
      onClick={() => {
        setDismissed(false);
        setOpen(!open());
      }}
      onKeyDown={onKeyDown}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setDismissed(false);
      }}
      onFocusOut={() => setDismissed(false)}
    >
      <span class='info-tip-marker' aria-hidden='true'>
        {props.marker ?? '*'}
      </span>
      <span ref={bubble} id={bubbleId} class='info-tip-bubble' role='tooltip' style={{ '--tip-shift': `${shift()}px` }}>
        {props.children}
      </span>
    </span>
  );
}
