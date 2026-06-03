import type { MarketId } from '@/features/markets';

export interface UiState {
  columns: MarketId[];
  mobileMarketId: MarketId;
  betslipExpanded: boolean;
}
