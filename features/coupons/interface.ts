export interface PlacedSelection {
  eventName: string;
  league: string;
  marketName: string;
  outcomeName: string;
  odd: number;
}

export interface PlacedCoupon {
  id: string;
  createdAt: number;
  stake: number;
  totalOdds: number;
  potentialReturn: number;
  selections: PlacedSelection[];
}

export interface CouponsState {
  items: PlacedCoupon[];
}
