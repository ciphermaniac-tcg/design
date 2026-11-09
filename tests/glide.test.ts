/**
 * The panel entrance (src/lib/glide.ts): it travels from the side its tab lies
 * on, and stands still under reduced motion or when the tab did not move.
 */

import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';

import { enterPanel } from '../src/lib/glide.ts';

function fakePanel() {
  const calls: Keyframe[][] = [];
  const panel = { animate: (frames: Keyframe[]) => calls.push(frames) } as unknown as HTMLElement;
  return { panel, calls };
}

function preferReducedMotion(reduce: boolean) {
  globalThis.matchMedia = (() => ({ matches: reduce })) as unknown as typeof matchMedia;
}

afterEach(() => {
  delete (globalThis as { matchMedia?: unknown }).matchMedia;
});

test('the panel enters from the side its tab lies on', () => {
  preferReducedMotion(false);
  const { panel, calls } = fakePanel();
  enterPanel(panel, -1);
  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.[0]?.transform, 'translateX(-12px)');
});

test('reduced motion, or a tab that did not move, leaves the panel still', () => {
  preferReducedMotion(true);
  const reduced = fakePanel();
  enterPanel(reduced.panel, 1);
  assert.equal(reduced.calls.length, 0);

  preferReducedMotion(false);
  const same = fakePanel();
  enterPanel(same.panel, 0);
  assert.equal(same.calls.length, 0);
});
