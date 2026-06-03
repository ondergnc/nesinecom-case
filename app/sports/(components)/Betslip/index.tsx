'use client';

import { useCallback, useEffect, useRef } from 'react';
import { clearBetslip, selectPotentialReturn, selectSelectionCount } from '@/features/betslip';
import { selectBetslipExpanded, setBetslipExpanded } from '@/features/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CollapsedBar from './CollapsedBar';
import Footer from './Footer';
import Selections from './Selections';
import type { BetslipProps } from './interface';
import './style.scss';

export default function Betslip({ className }: BetslipProps) {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectSelectionCount);
  const potentialReturn = useAppSelector(selectPotentialReturn);
  const expanded = useAppSelector(selectBetslipExpanded);

  const prevCount = useRef(count);
  useEffect(() => {
    if (prevCount.current === 0 && count > 0 && !expanded) {
      dispatch(setBetslipExpanded(true));
    }
    prevCount.current = count;
  }, [count, expanded, dispatch]);

  const collapse = useCallback(() => dispatch(setBetslipExpanded(false)), [dispatch]);
  const expand = useCallback(() => dispatch(setBetslipExpanded(true)), [dispatch]);
  const handleClear = useCallback(() => dispatch(clearBetslip()), [dispatch]);

  const showPanel = count > 0 && expanded;

  return (
    <aside
      className={`betslip${showPanel ? ' betslip-expanded' : ' betslip-collapsed'}${className ? ` ${className}` : ''}`}
      aria-label="Kupon"
    >
      {showPanel ? (
        <>
          <header className="betslip-header">
            <button type="button" className="betslip-collapse" onClick={collapse} aria-label="Küçült" title="Küçült">
              ▾
            </button>
            <span className="betslip-title">Kuponum</span>
            <span className="betslip-count">{count}</span>
            <button type="button" className="betslip-clear" onClick={handleClear}>
              Temizle
            </button>
          </header>
          <Selections />
          <Footer />
        </>
      ) : (
        <CollapsedBar count={count} potentialReturn={potentialReturn} onExpand={expand} />
      )}
    </aside>
  );
}
