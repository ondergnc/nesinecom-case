'use client';

import { useCallback } from 'react';
import {
  clearBetslip,
  selectBetslipItems,
  selectPotentialReturn,
  selectSelectionCount,
  selectStake,
  selectTotalOdds,
  setStake,
} from '@/features/betslip';
import { addCoupon } from '@/features/coupons';
import { formatCurrency, formatOdds } from '@/lib/format';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import './style.scss';

export default function Footer() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectBetslipItems);
  const count = useAppSelector(selectSelectionCount);
  const stake = useAppSelector(selectStake);
  const totalOdds = useAppSelector(selectTotalOdds);
  const potentialReturn = useAppSelector(selectPotentialReturn);

  const handleStakeChange = useCallback(
    (raw: string) => {
      const value = raw === '' ? 0 : Number(raw);
      dispatch(setStake(value));
    },
    [dispatch],
  );

  const handlePlace = useCallback(() => {
    if (count === 0 || stake <= 0) return;
    dispatch(
      addCoupon({
        stake,
        totalOdds,
        potentialReturn,
        selections: items.map((i) => ({
          eventName: i.eventName,
          league: i.league,
          marketName: i.marketName,
          outcomeName: i.outcomeName,
          odd: i.odd,
        })),
      }),
    );
    dispatch(clearBetslip());
  }, [dispatch, count, stake, totalOdds, potentialReturn, items]);

  const canPlace = count > 0 && stake > 0;

  return (
    <footer className="betslip-footer">
      <div className="betslip-footer-row">
        <label className="betslip-footer-stake">
          <span className="betslip-footer-stake-label">Tutar</span>
          <span className="betslip-footer-stake-field">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              value={stake === 0 ? '' : stake}
              onChange={(e) => handleStakeChange(e.target.value)}
              placeholder="0"
            />
            <span className="betslip-footer-stake-unit">₺</span>
          </span>
        </label>
      </div>

      <div className="betslip-footer-summary">
        <div className="betslip-footer-line">
          <span>Toplam Oran</span>
          <strong>{formatOdds(totalOdds)}</strong>
        </div>
        <div className="betslip-footer-line betslip-footer-line-accent">
          <span>Tahmini Kazanç</span>
          <strong>{formatCurrency(potentialReturn)}</strong>
        </div>
      </div>

      <button type="button" className="betslip-footer-submit" disabled={!canPlace} onClick={handlePlace}>
        <span>Kuponu Onayla</span>
        {canPlace && <span className="betslip-footer-submit-amount">{formatCurrency(potentialReturn)}</span>}
      </button>
    </footer>
  );
}
