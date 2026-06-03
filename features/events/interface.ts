import type { EventRowKind, RequestStatus } from './enum';

export interface RawOutcome {
  ID: string;
  O: string;
  N: string;
  MBS: string;
  G: string;
  OD: number;
  IMF: boolean;
}

export interface RawMarketGroup {
  ID: string;
  N: string;
  MBS: string;
  SO: number;
  OC: Record<string, RawOutcome>;
}

export interface RawEvent {
  C: string;
  N: string;
  TYPE: string;
  NID: string;
  D: string;
  T: string;
  DAY: string;
  S: string;
  LN: string;
  IMF: boolean;
  OCG: Record<string, RawMarketGroup>;
  HEC: boolean;
}

export type RawBetsResponse = RawEvent[];

export interface EventOutcome {
  id: string;
  name: string;
  odd: number;
}

export interface NormalizedEvent {
  id: string;
  name: string;
  league: string;
  date: string;
  time: string;
  day: string;
  status: string;
  markets: Record<string, Record<string, EventOutcome>>;
}

export type EventListRow =
  | { type: EventRowKind.League; key: string; league: string }
  | { type: EventRowKind.Event; key: string; id: string };

export interface NormalizedEvents {
  byId: Record<string, NormalizedEvent>;
  allIds: string[];
  rows: EventListRow[];
  eventCount: number;
}

export interface EventsState {
  byId: Record<string, NormalizedEvent>;
  allIds: string[];
  rows: EventListRow[];
  eventCount: number;
  status: RequestStatus;
  error: string | null;
  isStale: boolean;
  lastUpdated: number | null;
}
