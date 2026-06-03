import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_COLUMNS, DEFAULT_MARKET_ID, type MarketId } from '@/features/markets';
import type { RootState } from '@/store';
import type { UiState } from './interface';

export * from './interface';

const initialState: UiState = {
  columns: [...DEFAULT_COLUMNS],
  mobileMarketId: DEFAULT_MARKET_ID,
  betslipExpanded: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setColumnMarket(state, action: PayloadAction<{ index: number; marketId: MarketId }>) {
      const { index, marketId } = action.payload;
      if (index >= 0 && index < state.columns.length) {
        state.columns[index] = marketId;
      }
    },
    setMobileMarket(state, action: PayloadAction<MarketId>) {
      state.mobileMarketId = action.payload;
    },
    setBetslipExpanded(state, action: PayloadAction<boolean>) {
      state.betslipExpanded = action.payload;
    },
    hydrateUi(state, action: PayloadAction<Partial<UiState>>) {
      const next = action.payload;
      if (next.mobileMarketId) state.mobileMarketId = next.mobileMarketId;
      if (typeof next.betslipExpanded === 'boolean') state.betslipExpanded = next.betslipExpanded;
    },
  },
});

export const { setColumnMarket, setMobileMarket, setBetslipExpanded, hydrateUi } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

export const selectColumns = (state: RootState) => state.ui.columns;
export const selectMobileMarketId = (state: RootState) => state.ui.mobileMarketId;
export const selectBetslipExpanded = (state: RootState) => state.ui.betslipExpanded;
