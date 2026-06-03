'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { hydrateBetslip } from '@/features/betslip';
import { hydrateCoupons } from '@/features/coupons';
import { hydrateUi } from '@/features/ui';
import { makeStore } from '@/store';
import { attachPersistence, loadPersistedState } from '@/store/persistence';
import type { ProvidersProps } from './interface';

export default function Providers({ children }: ProvidersProps) {
  const [store] = useState(makeStore);

  useEffect(() => {
    const persisted = loadPersistedState();
    if (persisted?.betslip) store.dispatch(hydrateBetslip(persisted.betslip));
    if (persisted?.coupons?.items) store.dispatch(hydrateCoupons(persisted.coupons.items));
    if (persisted?.ui) store.dispatch(hydrateUi(persisted.ui));
    attachPersistence(store);
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
