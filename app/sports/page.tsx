'use client';

import dynamic from 'next/dynamic';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import Betslip from './(components)/Betslip';
import MarketHeader from './(components)/MarketHeader';
import EventsSkeleton from './(components)/Skeleton';
import StateView from './(components)/StateView';
import { StateViewVariant } from './(components)/StateView/enum';
import { selectEventCount } from '@/features/events';
import { useEventsLoader } from '@/hooks/useEventsLoader';
import { useAppSelector } from '@/store/hooks';
import './style.scss';

const EventsList = dynamic(() => import('./(components)/EventsList'), {
  ssr: false,
  loading: () => <EventsSkeleton />,
});

export default function SportsPage() {
  const { isRevalidating, isEmpty, error, reload } = useEventsLoader();
  const eventCount = useAppSelector(selectEventCount);
  const hasData = eventCount > 0;

  return (
    <div className="sports-page">
      <AppHeader
        title="Spor"
        count={hasData ? eventCount : undefined}
        countSuffix="maç"
        action={{ href: '/sports/bets', label: 'Geçmiş' }}
      />

      <main className="sports-page-main">
        <MarketHeader className="sports-page-market-header" />

        {isRevalidating && hasData && (
          <div className="sports-page-revalidating" role="status">
            <span className="sports-page-revalidating-dot" aria-hidden="true" />
            Güncelleniyor…
          </div>
        )}

        <div className="sports-page-list">
          {hasData ? (
            <EventsList />
          ) : error ? (
            <StateView variant={StateViewVariant.Error} message={error} onRetry={reload} />
          ) : isEmpty ? (
            <StateView variant={StateViewVariant.Empty} />
          ) : (
            <EventsSkeleton />
          )}
        </div>
      </main>

      <AppFooter />
      <Betslip />
    </div>
  );
}
