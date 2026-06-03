'use client';

import { StateViewVariant } from './enum';
import type { StateViewProps } from './interface';
import './style.scss';

const DEFAULTS: Record<StateViewVariant, { title: string; message: string }> = {
  [StateViewVariant.Loading]: { title: 'Maçlar yükleniyor', message: 'Lütfen bekleyin…' },
  [StateViewVariant.Error]: { title: 'Bir şeyler ters gitti', message: 'Maçlar yüklenemedi.' },
  [StateViewVariant.Empty]: { title: 'Maç yok', message: 'Şu anda oynanabilecek maç yok.' },
};

export default function StateView({ variant, title, message, onRetry }: StateViewProps) {
  const fallback = DEFAULTS[variant];

  return (
    <div className={`state-view state-view-${variant}`} role="status" aria-live="polite">
      {variant === StateViewVariant.Loading && <span className="state-view-spinner" aria-hidden="true" />}
      <p className="state-view-title">{title ?? fallback.title}</p>
      <p className="state-view-message">{message ?? fallback.message}</p>
      {variant === StateViewVariant.Error && onRetry && (
        <button type="button" className="state-view-retry" onClick={onRetry}>
          Tekrar Dene
        </button>
      )}
    </div>
  );
}
