import type { MarketId } from '@/features/markets';
import type { EventListRow } from '@/features/events';

export interface EventsListRowProps {
  rows: EventListRow[];
  columns: MarketId[];
}
