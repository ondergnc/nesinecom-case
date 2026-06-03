'use client';

import { memo, useCallback } from 'react';
import { getMarketById, MARKETS, type MarketId } from '@/features/markets';
import { selectColumns, selectMobileMarketId, setMobileMarket } from '@/features/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { MarketHeaderProps } from './interface';
import './style.scss';

function MarketHeaderBase({ className }: MarketHeaderProps) {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectColumns);
  const mobileMarketId = useAppSelector(selectMobileMarketId);

  const handleMobileChange = useCallback((value: string) => dispatch(setMobileMarket(value as MarketId)), [dispatch]);

  return (
    <div className={`market-header${className ? ` ${className}` : ''}`} role="row">
      <div className="market-header-inner">
        <label className="market-header-select">
          <select
            aria-label="Market seçimi"
            value={mobileMarketId}
            onChange={(e) => handleMobileChange(e.target.value)}
          >
            {MARKETS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <span className="market-header-chevron" aria-hidden="true" />
        </label>

        <div className="market-header-spacer" />

        <div className="market-header-cols">
          {columns.map((marketId, index) => {
            const market = getMarketById(marketId);
            if (!market) return null;
            return (
              <div key={index} className="market-header-group" style={{ ['--cols' as string]: market.columns.length }}>
                <span className="market-header-group-title" title={market.name}>
                  {market.name}
                </span>
                <div className="market-header-labels">
                  {market.columns.map((col) => (
                    <span key={col.ocId} className="market-header-label">
                      {col.label}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(MarketHeaderBase);
