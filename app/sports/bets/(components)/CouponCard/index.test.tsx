import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PlacedCoupon } from '@/features/coupons';
import CouponCard from './index';

const coupon: PlacedCoupon = {
  id: 'c1',
  createdAt: Date.now(),
  stake: 100,
  totalOdds: 9.2,
  potentialReturn: 920,
  selections: [{ eventName: 'A - B', league: 'Lig', marketName: 'Maç Sonucu', outcomeName: '1', odd: 9.2 }],
};

describe('CouponCard', () => {
  it('maç, tahmini kazanç ve oranı gösterir', () => {
    render(<CouponCard coupon={coupon} onRemove={() => {}} />);
    expect(screen.getByText('A - B')).toBeInTheDocument();
    expect(screen.getByText('Tahmini Kazanç')).toBeInTheDocument();
    expect(screen.getByText('920,00 ₺')).toBeInTheDocument();
  });

  it('sil butonuna basınca kupon id ile onRemove çağrılır', async () => {
    const onRemove = vi.fn();
    render(<CouponCard coupon={coupon} onRemove={onRemove} />);
    await userEvent.click(screen.getByRole('button', { name: 'Kuponu sil' }));
    expect(onRemove).toHaveBeenCalledWith('c1');
  });
});
