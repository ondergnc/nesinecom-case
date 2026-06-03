import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/services';
import type { RootState } from '@/store';
import { EventRowKind, RequestStatus } from './enum';
import type { EventListRow, EventsState, NormalizedEvent, NormalizedEvents, RawBetsResponse } from './interface';

export * from './enum';
export * from './interface';

export const BETS_PATH = '/bets';

export function normalizeEvents(raw: RawBetsResponse): NormalizedEvents {
  const byId: Record<string, NormalizedEvent> = {};
  const allIds: string[] = [];
  const rows: EventListRow[] = [];

  let currentLeague: string | null = null;

  for (const event of raw) {
    const id = event.C;

    const markets: NormalizedEvent['markets'] = {};
    for (const marketId in event.OCG) {
      const group = event.OCG[marketId];
      const outcomes: Record<string, NormalizedEvent['markets'][string][string]> = {};
      for (const ocId in group.OC) {
        const oc = group.OC[ocId];
        outcomes[ocId] = { id: oc.ID, name: oc.N, odd: Number(oc.O) };
      }
      markets[marketId] = outcomes;
    }

    byId[id] = {
      id,
      name: event.N,
      league: event.LN,
      date: event.D,
      time: event.T,
      day: event.DAY,
      status: event.S,
      markets,
    };
    allIds.push(id);

    if (event.LN !== currentLeague) {
      currentLeague = event.LN;
      rows.push({ type: EventRowKind.League, key: `league-${rows.length}-${event.LN}`, league: event.LN });
    }
    rows.push({ type: EventRowKind.Event, key: `event-${id}`, id });
  }

  return { byId, allIds, rows, eventCount: allIds.length };
}

export const loadEvents = createAsyncThunk<NormalizedEvents, void, { rejectValue: string; state: RootState }>(
  'events/load',
  async (_, { signal, rejectWithValue }) => {
    try {
      const raw = await api.get<RawBetsResponse>(BETS_PATH, { signal, persist: true });
      return normalizeEvents(raw);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') throw err;
      const message = err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu';
      return rejectWithValue(message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().events;
      return status !== RequestStatus.Loading && status !== RequestStatus.Succeeded;
    },
  },
);

const initialState: EventsState = {
  byId: {},
  allIds: [],
  rows: [],
  eventCount: 0,
  status: RequestStatus.Idle,
  error: null,
  isStale: false,
  lastUpdated: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    applyCachedEvents(state, action: PayloadAction<NormalizedEvents>) {
      state.byId = action.payload.byId;
      state.allIds = action.payload.allIds;
      state.rows = action.payload.rows;
      state.eventCount = action.payload.eventCount;
      state.isStale = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEvents.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.byId = action.payload.byId;
        state.allIds = action.payload.allIds;
        state.rows = action.payload.rows;
        state.eventCount = action.payload.eventCount;
        state.isStale = false;
        state.lastUpdated = Date.now();
      })
      .addCase(loadEvents.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload ?? 'Maçlar yüklenemedi';
      });
  },
});

export const { applyCachedEvents } = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;

export const selectEventRows = (state: RootState) => state.events.rows;
export const selectEventsStatus = (state: RootState) => state.events.status;
export const selectEventsError = (state: RootState) => state.events.error;
export const selectEventCount = (state: RootState) => state.events.eventCount;
export const selectEventsLastUpdated = (state: RootState) => state.events.lastUpdated;
export const selectIsEventsStale = (state: RootState) => state.events.isStale;

export const selectEventById =
  (id: string) =>
  (state: RootState): NormalizedEvent | undefined =>
    state.events.byId[id];

export const selectIsEventsLoading = (state: RootState) =>
  state.events.eventCount === 0 &&
  (state.events.status === RequestStatus.Loading || state.events.status === RequestStatus.Idle);

export const selectIsRevalidating = (state: RootState) =>
  state.events.eventCount > 0 && state.events.status === RequestStatus.Loading;

export const selectIsEventsEmpty = (state: RootState) =>
  state.events.status === RequestStatus.Succeeded && state.events.eventCount === 0;
