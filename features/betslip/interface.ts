export interface BetSelection {
  eventId: string;
  eventName: string;
  league: string;
  marketId: string;
  marketName: string;
  outcomeId: string;
  outcomeName: string;
  odd: number;
}

export interface BetslipState {
  selections: Record<string, BetSelection>;
  order: string[];
  stake: number;
}
