import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { eventsReducer } from '@/features/events';
import { betslipReducer } from '@/features/betslip';
import { couponsReducer } from '@/features/coupons';
import { uiReducer } from '@/features/ui';

const rootReducer = combineReducers({
  events: eventsReducer,
  betslip: betslipReducer,
  coupons: couponsReducer,
  ui: uiReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
