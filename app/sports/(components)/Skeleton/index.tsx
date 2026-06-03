import type { EventsSkeletonProps } from './interface';
import './style.scss';

export default function EventsSkeleton({ rows = 12 }: EventsSkeletonProps) {
  return (
    <div className="skeleton" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-inner">
            <div className="skeleton-info">
              <span className="skeleton-line skeleton-line-sm" />
              <span className="skeleton-line skeleton-line-lg" />
            </div>
            <div className="skeleton-odds">
              <span className="skeleton-cell" />
              <span className="skeleton-cell" />
              <span className="skeleton-cell" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
