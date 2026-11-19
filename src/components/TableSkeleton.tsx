import { For, Show } from 'solid-js';
import { Skeleton } from './Skeleton';

export interface SkeletonColumn {
  label: string;
  class?: string;
  /** The placeholder's width; a column without one stays empty (a caret). */
  width?: string;
}

/** Centred in the row like the text it stands in for. */
const MIDDLE = { 'vertical-align': 'middle' } as const;

interface TableSkeletonProps {
  columns: SkeletonColumn[];
  rows?: number;
  /** Classes for the `.table-wrap`, such as a page's own table class. */
  class?: string;
}

/**
 * A table still loading: its real head over still rows at the real row
 * height, so nothing moves when the rows arrive.
 */
export function TableSkeleton(props: TableSkeletonProps) {
  return (
    <div class={props.class ? `table-wrap ${props.class}` : 'table-wrap'} aria-busy='true'>
      <table class='data'>
        <thead>
          <tr>
            <For each={props.columns}>{column => <th class={column.class}>{column.label}</th>}</For>
          </tr>
        </thead>
        <tbody>
          <For each={Array.from({ length: props.rows ?? 10 })}>
            {() => (
              <tr>
                <For each={props.columns}>
                  {column => (
                    <td class={column.class}>
                      <Show when={column.width}>
                        {width => <Skeleton inline width={width()} height='1em' style={MIDDLE} />}
                      </Show>
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
