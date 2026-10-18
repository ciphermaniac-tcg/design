/**
 * A page, or the part of one, that could not be shown: a large pale code
 * (404, the event's code, Error), a heading, one line saying what happened,
 * and the ways on. Not-found pages, a missing or unloadable event or
 * profile, a used invite and a crash all draw it the same.
 * @module components/ErrorState
 */

import type { JSX } from 'solid-js';

export function ErrorState(props: { code: string; title: string; line: string; children?: JSX.Element }) {
  return (
    <section class='error-state'>
      {/* Drawn from the attribute by CSS: pure decoration, so it is neither read
          out nor held to text contrast (WCAG 1.4.3 exempts it). */}
      <p class='error-state-code' data-code={props.code} aria-hidden='true' />
      <h1>{props.title}</h1>
      <p class='error-state-line'>{props.line}</p>
      <div class='error-state-actions'>{props.children}</div>
    </section>
  );
}
