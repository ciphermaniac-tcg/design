/**
 * Motion that follows a choice: one mark that travels to the chosen item
 * (the tabs' underline, the segmented control's pill), and a panel that
 * enters from the side its tab lies on. Both stand still under reduced motion.
 */

export const reducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Puts `mark` over `active` inside `host`, as the custom properties
 * `--mark-x`, `--mark-y`, `--mark-w` and `--mark-h`, measured from the box so
 * an item inside a wrapper (a locked tab) and a scrolled strip both measure
 * right. The first placement lands without travelling.
 */
export function placeMark(host: HTMLElement, mark: HTMLElement, active: HTMLElement | null | undefined) {
  mark.toggleAttribute('hidden', !active);
  if (!active) {
    return;
  }
  const from = host.getBoundingClientRect();
  const box = active.getBoundingClientRect();
  mark.style.setProperty('--mark-x', `${box.left - from.left - host.clientLeft + host.scrollLeft}px`);
  mark.style.setProperty('--mark-y', `${box.top - from.top - host.clientTop}px`);
  mark.style.setProperty('--mark-w', `${box.width}px`);
  mark.style.setProperty('--mark-h', `${box.height}px`);
  if (!mark.classList.contains('is-placed')) {
    // Commit the first place before travel is switched on, so it lands without moving.
    void mark.offsetWidth;
    mark.classList.add('is-placed');
  }
}

/**
 * Brings a panel in from the side its tab lies on: `step` is +1 for a tab to
 * the right of the last one, -1 to the left. A short travel and a fade, so
 * the eye follows the move without waiting on it.
 */
export function enterPanel(panel: HTMLElement, step: number) {
  if (reducedMotion() || step === 0 || typeof panel.animate !== 'function') {
    return;
  }
  panel.animate(
    [
      { opacity: 0, transform: `translateX(${step * 12}px)` },
      { opacity: 1, transform: 'none' }
    ],
    { duration: 180, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
  );
}
