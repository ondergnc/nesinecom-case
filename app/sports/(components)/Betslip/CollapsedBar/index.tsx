'use client';

import { formatCurrency } from '@/lib/format';
import type { CollapsedBarProps } from './interface';
import './style.scss';

export default function CollapsedBar({ count, potentialReturn, onExpand }: CollapsedBarProps) {
  const hasPicks = count > 0;

  return (
    <button
      type="button"
      className={`collapsed-bar${hasPicks ? ' collapsed-bar-active' : ''}`}
      onClick={onExpand}
      disabled={!hasPicks}
      aria-label="Kuponu aç"
    >
      <span className="collapsed-bar-left">
        <span className="collapsed-bar-icon" aria-hidden="true">
          🧾
        </span>
        <span className="collapsed-bar-title">Kuponum</span>
        <span className="collapsed-bar-count">{count}</span>
      </span>
      <span className="collapsed-bar-right">{hasPicks ? formatCurrency(potentialReturn) : 'Boş'}</span>
    </button>
  );
}
