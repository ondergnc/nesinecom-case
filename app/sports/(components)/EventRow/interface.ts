import type { CSSProperties } from 'react';
import type { MarketId } from '@/features/markets';

export interface EventRowProps {
  id: string;
  columns: MarketId[];
  isLast: boolean;
  style: CSSProperties;
}
