import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { CouponsState, PlacedCoupon } from './interface';

export * from './interface';

export type NewCoupon = Omit<PlacedCoupon, 'id' | 'createdAt'>;

const initialState: CouponsState = {
  items: [],
};

const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    addCoupon: {
      reducer(state, action: PayloadAction<PlacedCoupon>) {
        state.items.unshift(action.payload);
      },
      prepare(coupon: NewCoupon) {
        return { payload: { ...coupon, id: nanoid(), createdAt: Date.now() } };
      },
    },

    removeCoupon(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },

    clearCoupons() {
      return initialState;
    },

    hydrateCoupons(state, action: PayloadAction<PlacedCoupon[]>) {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

export const { addCoupon, removeCoupon, clearCoupons, hydrateCoupons } = couponsSlice.actions;
export const couponsReducer = couponsSlice.reducer;

export const selectCoupons = (state: RootState) => state.coupons.items;
export const selectCouponCount = (state: RootState) => state.coupons.items.length;
