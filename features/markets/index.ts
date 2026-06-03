import { MarketId } from './enum';
import type { MarketDefinition } from './interface';

export const MARKETS: readonly MarketDefinition[] = Object.freeze([
  {
    id: MarketId.MatchResult,
    name: 'Maç Sonucu',
    columns: [
      { ocId: '0', label: '1' },
      { ocId: '1', label: 'X' },
      { ocId: '2', label: '2' },
    ],
  },
  {
    id: MarketId.DoubleChance,
    name: 'Çifte Şans',
    columns: [
      { ocId: '3', label: '1-X' },
      { ocId: '4', label: '1-2' },
      { ocId: '5', label: 'X-2' },
    ],
  },
  {
    id: MarketId.OverUnder25,
    name: 'Alt/Üst 2,5 Gol',
    columns: [
      { ocId: '25', label: 'Alt' },
      { ocId: '26', label: 'Üst' },
    ],
  },
]);

export const DEFAULT_MARKET_ID: MarketId = MarketId.MatchResult;

export const DEFAULT_COLUMNS: readonly MarketId[] = Object.freeze([
  MarketId.MatchResult,
  MarketId.DoubleChance,
  MarketId.OverUnder25,
]);

export function getMarketById(id: MarketId): MarketDefinition | undefined {
  return MARKETS.find((m) => m.id === id);
}

export * from './enum';
export * from './interface';
