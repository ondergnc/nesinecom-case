import type { MarketId } from './enum';

export interface MarketColumn {
  ocId: string;
  label: string;
}

export interface MarketDefinition {
  id: MarketId;
  name: string;
  columns: MarketColumn[];
}
