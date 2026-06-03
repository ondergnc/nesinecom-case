import type { PlacedCoupon } from '@/features/coupons';

export interface CouponCardProps {
  coupon: PlacedCoupon;
  onRemove: (id: string) => void;
}
