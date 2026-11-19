import { type JSX, Show } from 'solid-js';
import './SortTh.css';

export type SortState = 'ascending' | 'descending' | 'none';

interface SortThProps {
  /** The column's state, written to `aria-sort`; the mark follows it. */
  sort: SortState;
  onSort: () => void;
  class?: string;
  /** A note on the column (an InfoTip), set before the label. */
  note?: JSX.Element;
  children: JSX.Element;
}

/**
 * A sortable column head: the whole head is one button, and the sort mark is
 * drawn from `aria-sort` by primitives.css, reserved so nothing moves when the
 * sort changes.
 */
export function SortTh(props: SortThProps) {
  const button = () => (
    <button type='button' class='th-sort' onClick={() => props.onSort()}>
      {props.children}
    </button>
  );
  return (
    <th class={props.class ? `sortable ${props.class}` : 'sortable'} aria-sort={props.sort}>
      <Show when={props.note} fallback={button()}>
        <span class='th-noted'>
          {props.note}
          {button()}
        </span>
      </Show>
    </th>
  );
}
