'use client';

import { memo } from 'react';
import OddButton from '../OddButton';
import { selectEventById } from '@/features/events';
import { getMarketById } from '@/features/markets';
import { useAppSelector } from '@/store/hooks';
import type { EventRowProps } from './interface';
import './style.scss';

function EventRowBase({ id, columns, isLast, style }: EventRowProps) {
  const event = useAppSelector(selectEventById(id));

  if (!event) {
    return <div className="event-row event-row-empty" style={style} />;
  }

  return (
    <div className={`event-row${isLast ? ' event-row-last' : ''}`} style={style}>
      <div className="event-row-inner">
        <div className="event-row-info">
          <div className="event-row-time">
            <span className="event-row-date">{event.date}</span>
            <span className="event-row-hour">{event.time}</span>
          </div>
          <div className="event-row-match" title={event.name}>
            {event.name}
          </div>
        </div>

        <div className="event-row-markets">
          {columns.map((marketId, index) => {
            const market = getMarketById(marketId);
            if (!market) return null;
            const groupOutcomes = event.markets[marketId];
            return (
              <div
                key={index}
                className="event-row-group"
                data-market={marketId}
                style={{ ['--cols' as string]: market.columns.length }}
              >
                {market.columns.map((col) => {
                  const outcome = groupOutcomes?.[col.ocId];
                  return (
                    <OddButton
                      key={col.ocId}
                      eventId={event.id}
                      eventName={event.name}
                      league={event.league}
                      marketId={marketId}
                      marketName={market.name}
                      outcomeId={col.ocId}
                      label={col.label}
                      odd={outcome?.odd}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(EventRowBase);
