'use client';

import { useCallback } from 'react';
import AppFooter from '@/components/AppFooter';
import AppHeader from '@/components/AppHeader';
import { removeCoupon, selectCoupons } from '@/features/coupons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CouponCard from './(components)/CouponCard';
import './style.scss';

export default function BetsPage() {
  const dispatch = useAppDispatch();
  const coupons = useAppSelector(selectCoupons);

  const handleRemove = useCallback((id: string) => dispatch(removeCoupon(id)), [dispatch]);

  return (
    <div className="bets-page">
      <AppHeader title="Geçmiş" count={coupons.length} action={{ href: '/sports', label: 'Spor' }} />

      <main className="bets-page-main">
        <div className="bets-page-inner">
          {coupons.length === 0 ? (
            <div className="bets-page-empty">
              <p className="bets-page-empty-title">Henüz kupon yok</p>
              <p className="bets-page-empty-text">Onayladığınız kuponlar burada görünür.</p>
            </div>
          ) : (
            <div className="bets-page-list">
              {coupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
