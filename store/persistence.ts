import type { Store } from '@reduxjs/toolkit';
import type { RootState } from './index';

const STORAGE_KEY = 'nesine.state.v1';
const WRITE_DEBOUNCE_MS = 300;

type PersistedState = Pick<RootState, 'betslip' | 'coupons' | 'ui'>;

const hasWindow = () => typeof window !== 'undefined';

export function loadPersistedState(): Partial<PersistedState> | undefined {
  if (!hasWindow()) return undefined;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return parsed && typeof parsed === 'object' ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function attachPersistence(store: Store<RootState>): void {
  if (!hasWindow()) return;

  let timer: ReturnType<typeof setTimeout> | null = null;

  store.subscribe(() => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      try {
        const { betslip, coupons, ui } = store.getState();
        const snapshot: PersistedState = { betslip, coupons, ui };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
      } catch {}
    }, WRITE_DEBOUNCE_MS);
  });
}
