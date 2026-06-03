'use client';

import { useMemo } from 'react';
import { List, type RowComponentProps } from 'react-window';
import EventRow from '../EventRow';
import LeagueRow from '../LeagueRow';
import { EventRowKind, selectEventRows } from '@/features/events';
import { selectColumns, selectMobileMarketId } from '@/features/ui';
import { useAppSelector } from '@/store/hooks';
import { RowHeight } from './enum';
import type { EventsListRowProps } from './interface';
import './style.scss';

function EventsRowRenderer({ index, style, rows, columns }: RowComponentProps<EventsListRowProps>) {
  const row = rows[index];
  if (row.type === EventRowKind.League) {
    return <LeagueRow league={row.league} style={style} />;
  }
  const next = rows[index + 1];
  const isLast = !next || next.type === EventRowKind.League;
  return <EventRow id={row.id} columns={columns} isLast={isLast} style={style} />;
}

function getRowHeight(index: number, { rows }: EventsListRowProps): number {
  return rows[index].type === EventRowKind.League ? RowHeight.League : RowHeight.Event;
}

export default function EventsList() {
  const rows = useAppSelector(selectEventRows);
  const columns = useAppSelector(selectColumns);
  const mobileMarketId = useAppSelector(selectMobileMarketId);

  const rowProps = useMemo<EventsListRowProps>(() => ({ rows, columns }), [rows, columns]);

  return (
    <div className="events-list" data-mobile-market={mobileMarketId}>
      <List<EventsListRowProps>
        className="events-list-list"
        rowComponent={EventsRowRenderer}
        rowCount={rows.length}
        rowHeight={getRowHeight}
        rowProps={rowProps}
        overscanCount={6}
        style={{ height: '100%' }}
      />
    </div>
  );
}
