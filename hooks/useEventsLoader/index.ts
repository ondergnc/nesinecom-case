'use client';

import { useCallback, useEffect } from 'react';
import {
  applyCachedEvents,
  BETS_PATH,
  loadEvents,
  normalizeEvents,
  selectEventsError,
  selectEventsStatus,
  selectIsEventsEmpty,
  selectIsEventsLoading,
  selectIsRevalidating,
  type RawBetsResponse,
} from '@/features/events';
import { api } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { UseEventsLoaderResult } from './interface';

export function useEventsLoader(): UseEventsLoaderResult {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectEventsStatus);
  const error = useAppSelector(selectEventsError);
  const isLoading = useAppSelector(selectIsEventsLoading);
  const isRevalidating = useAppSelector(selectIsRevalidating);
  const isEmpty = useAppSelector(selectIsEventsEmpty);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cached = await api.readCache<RawBetsResponse>(BETS_PATH);
      if (!cancelled && cached) {
        dispatch(applyCachedEvents(normalizeEvents(cached)));
      }
      if (!cancelled) dispatch(loadEvents());
    })();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const reload = useCallback(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  return { status, error, isLoading, isRevalidating, isEmpty, reload };
}
