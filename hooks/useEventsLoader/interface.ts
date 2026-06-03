import type { RequestStatus } from '@/features/events';

export interface UseEventsLoaderResult {
  status: RequestStatus;
  error: string | null;
  isLoading: boolean;
  isRevalidating: boolean;
  isEmpty: boolean;
  reload: () => void;
}
