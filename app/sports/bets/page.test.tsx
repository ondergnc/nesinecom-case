import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { addCoupon, type PlacedCoupon } from '@/features/coupons';
import { makeStore } from '@/store';
import { renderWithStore } from '@/test/render';
import BetsPage from './page';

const newCoupon: Omit<PlacedCoupon, 'id' | 'createdAt'> = {
  stake: 100,
  totalOdds: 9.2,
  potentialReturn: 920,
  selections: [{ eventName: 'A - B', league: 'Lig', marketName: 'Maç Sonucu', outcomeName: '1', odd: 9.2 }],
};

describe('BetsPage', () => {
  it('kupon yokken boş durum gösterir', () => {
    renderWithStore(<BetsPage />);
    expect(screen.getByText('Henüz kupon yok')).toBeInTheDocument();
  });

  it('onaylanmış kuponu listeler', () => {
    const store = makeStore();
    store.dispatch(addCoupon(newCoupon));
    renderWithStore(<BetsPage />, store);

    expect(screen.queryByText('Henüz kupon yok')).not.toBeInTheDocument();
    expect(screen.getByText('A - B')).toBeInTheDocument();
    expect(screen.getByText('920,00 ₺')).toBeInTheDocument();
  });
});
