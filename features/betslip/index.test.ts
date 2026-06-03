import { describe, expect, it } from 'vitest';
import type { RootState } from '@/store';
import {
  betslipReducer,
  clearBetslip,
  removeSelection,
  selectPotentialReturn,
  selectTotalOdds,
  setStake,
  toggleSelection,
  type BetSelection,
} from './index';

function selection(over: Partial<BetSelection> = {}): BetSelection {
  return {
    eventId: '1',
    eventName: 'A - B',
    league: 'Lig',
    marketId: '1',
    marketName: 'Maç Sonucu',
    outcomeId: '0',
    outcomeName: '1',
    odd: 2,
    ...over,
  };
}

describe('betslip reducer', () => {
  it('seçim ekler', () => {
    const state = betslipReducer(undefined, toggleSelection(selection()));
    expect(state.order).toEqual(['1']);
    expect(state.selections['1'].odd).toBe(2);
  });

  it('aynı seçime tekrar tıklayınca kaldırır', () => {
    let state = betslipReducer(undefined, toggleSelection(selection()));
    state = betslipReducer(state, toggleSelection(selection()));
    expect(state.order).toEqual([]);
  });

  it('aynı maçta farklı seçimi değiştirir', () => {
    let state = betslipReducer(undefined, toggleSelection(selection({ outcomeId: '0' })));
    state = betslipReducer(state, toggleSelection(selection({ outcomeId: '2', outcomeName: '2', odd: 3 })));
    expect(state.order).toEqual(['1']);
    expect(state.selections['1'].outcomeId).toBe('2');
  });

  it('removeSelection ve clearBetslip çalışır', () => {
    let state = betslipReducer(undefined, toggleSelection(selection()));
    state = betslipReducer(state, removeSelection('1'));
    expect(state.order).toEqual([]);

    state = betslipReducer(undefined, toggleSelection(selection()));
    state = betslipReducer(state, clearBetslip());
    expect(state.order).toEqual([]);
  });
});

describe('betslip selectors', () => {
  it('toplam oran ve tahmini kazanç doğru hesaplanır', () => {
    let bs = betslipReducer(undefined, setStake(10));
    bs = betslipReducer(bs, toggleSelection(selection({ eventId: '1', odd: 2 })));
    bs = betslipReducer(bs, toggleSelection(selection({ eventId: '2', odd: 3 })));

    const state = { betslip: bs } as unknown as RootState;
    expect(selectTotalOdds(state)).toBe(6);
    expect(selectPotentialReturn(state)).toBe(60);
  });
});
