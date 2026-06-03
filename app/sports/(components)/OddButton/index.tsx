'use client';

import { memo, useCallback } from 'react';
import { toggleSelection, selectIsOutcomeSelected } from '@/features/betslip';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { OddButtonProps } from './interface';
import './style.scss';

function OddButtonBase({ eventId, eventName, league, marketId, marketName, outcomeId, label, odd }: OddButtonProps) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(selectIsOutcomeSelected(eventId, marketId, outcomeId));

  const handleClick = useCallback(() => {
    if (odd === undefined) return;
    dispatch(
      toggleSelection({
        eventId,
        eventName,
        league,
        marketId,
        marketName,
        outcomeId,
        outcomeName: label,
        odd,
      }),
    );
  }, [dispatch, odd, eventId, eventName, league, marketId, marketName, outcomeId, label]);

  if (odd === undefined) {
    return (
      <button type="button" className="odd-button odd-button-locked" disabled aria-label={`${label} kapalı`}>
        <span className="odd-button-label">{label}</span>
        <span className="odd-button-odd" aria-hidden="true">
          🔒
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`odd-button${isSelected ? ' odd-button-active' : ''}`}
      onClick={handleClick}
      aria-pressed={isSelected}
      aria-label={`${label} ${odd.toFixed(2)}`}
    >
      <span className="odd-button-label">{label}</span>
      <span className="odd-button-odd">{odd.toFixed(2)}</span>
    </button>
  );
}

export default memo(OddButtonBase);
