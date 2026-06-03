import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { BetslipDefaults, BetslipLimit } from './enum';
import type { BetSelection, BetslipState } from './interface';

export * from './enum';
export * from './interface';

const initialState: BetslipState = {
  selections: {},
  order: [],
  stake: BetslipDefaults.Stake,
};

const betslipSlice = createSlice({
  name: 'betslip',
  initialState,
  reducers: {
    toggleSelection(state, action: PayloadAction<BetSelection>) {
      const sel = action.payload;
      const existing = state.selections[sel.eventId];

      if (existing && existing.outcomeId === sel.outcomeId && existing.marketId === sel.marketId) {
        delete state.selections[sel.eventId];
        state.order = state.order.filter((id) => id !== sel.eventId);
        return;
      }

      if (!existing && state.order.length >= BetslipLimit.MaxSelections) {
        return;
      }

      if (!existing) {
        state.order.push(sel.eventId);
      }
      state.selections[sel.eventId] = sel;
    },

    removeSelection(state, action: PayloadAction<string>) {
      const eventId = action.payload;
      if (state.selections[eventId]) {
        delete state.selections[eventId];
        state.order = state.order.filter((id) => id !== eventId);
      }
    },

    setStake(state, action: PayloadAction<number>) {
      state.stake = Number.isFinite(action.payload) && action.payload >= 0 ? action.payload : 0;
    },

    clearBetslip() {
      return initialState;
    },

    hydrateBetslip(_state, action: PayloadAction<BetslipState>) {
      return { ...initialState, ...action.payload };
    },
  },
});

export const { toggleSelection, removeSelection, setStake, clearBetslip, hydrateBetslip } = betslipSlice.actions;
export const betslipReducer = betslipSlice.reducer;

const selectSelections = (state: RootState) => state.betslip.selections;
const selectOrder = (state: RootState) => state.betslip.order;

export const selectStake = (state: RootState) => state.betslip.stake;

export const selectBetslipItems = createSelector([selectSelections, selectOrder], (selections, order): BetSelection[] =>
  order.map((id) => selections[id]).filter(Boolean),
);

export const selectSelectionCount = (state: RootState) => state.betslip.order.length;

export const selectTotalOdds = createSelector([selectBetslipItems], (items) =>
  items.reduce((acc, item) => acc * item.odd, 1),
);

export const selectPotentialReturn = createSelector(
  [selectBetslipItems, selectTotalOdds, selectStake],
  (items, odds, stake) => (items.length === 0 ? 0 : odds * stake),
);

export const selectIsOutcomeSelected =
  (eventId: string, marketId: string, outcomeId: string) =>
  (state: RootState): boolean => {
    const sel = state.betslip.selections[eventId];
    return !!sel && sel.marketId === marketId && sel.outcomeId === outcomeId;
  };
