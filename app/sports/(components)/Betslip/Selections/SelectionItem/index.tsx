'use client';

import { memo, useCallback } from 'react';
import { removeSelection } from '@/features/betslip';
import { formatOdds } from '@/lib/format';
import { useAppDispatch } from '@/store/hooks';
import type { SelectionItemProps } from './interface';
import './style.scss';

function SelectionItemBase({ selection }: SelectionItemProps) {
  const dispatch = useAppDispatch();

  const handleRemove = useCallback(() => {
    dispatch(removeSelection(selection.eventId));
  }, [dispatch, selection.eventId]);

  return (
    <div className="selection-item">
      <div className="selection-item-body">
        <div className="selection-item-match" title={selection.eventName}>
          {selection.eventName}
        </div>
        <div className="selection-item-market">{selection.marketName}</div>
        <div className="selection-item-pick">
          <span className="selection-item-outcome">{selection.outcomeName}</span>
          <span className="selection-item-odd">{formatOdds(selection.odd)}</span>
        </div>
      </div>
      <button
        type="button"
        className="selection-item-remove"
        onClick={handleRemove}
        aria-label="Seçimi kaldır"
        title="Kaldır"
      >
        ×
      </button>
    </div>
  );
}

export default memo(SelectionItemBase);
