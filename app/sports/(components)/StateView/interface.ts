import type { StateViewVariant } from './enum';

export interface StateViewProps {
  variant: StateViewVariant;
  title?: string;
  message?: string;
  onRetry?: () => void;
}
