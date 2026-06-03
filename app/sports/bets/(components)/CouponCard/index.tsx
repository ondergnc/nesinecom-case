import { formatCurrency, formatDateTime, formatOdds } from '@/lib/format';
import type { CouponCardProps } from './interface';
import './style.scss';

export default function CouponCard({ coupon, onRemove }: CouponCardProps) {
  return (
    <article className="coupon-card">
      <header className="coupon-card-header">
        <span className="coupon-card-date">{formatDateTime(coupon.createdAt)}</span>
        <span className="coupon-card-meta">
          {coupon.selections.length} maç · Oran {formatOdds(coupon.totalOdds)}
        </span>
        <button
          type="button"
          className="coupon-card-remove"
          onClick={() => onRemove(coupon.id)}
          aria-label="Kuponu sil"
          title="Sil"
        >
          ×
        </button>
      </header>

      <ul className="coupon-card-selections">
        {coupon.selections.map((sel, i) => (
          <li key={i} className="coupon-card-selection">
            <span className="coupon-card-match" title={sel.eventName}>
              {sel.eventName}
            </span>
            <span className="coupon-card-pick">
              <span className="coupon-card-outcome">
                {sel.marketName} · {sel.outcomeName}
              </span>
              <span className="coupon-card-odd">{formatOdds(sel.odd)}</span>
            </span>
          </li>
        ))}
      </ul>

      <footer className="coupon-card-footer">
        <div className="coupon-card-amount">
          <span>Tutar</span>
          <strong>{formatCurrency(coupon.stake)}</strong>
        </div>
        <div className="coupon-card-amount coupon-card-amount-accent">
          <span>Tahmini Kazanç</span>
          <strong>{formatCurrency(coupon.potentialReturn)}</strong>
        </div>
      </footer>
    </article>
  );
}
