import type { EventsSkeletonProps } from './interface';
import './style.scss';

export default function EventsSkeleton({ groups = 4, rowsPerGroup = 4 }: EventsSkeletonProps) {
  return (
    <div className="skeleton" aria-hidden="true">
      {Array.from({ length: groups }).map((_, g) => (
        <div key={g} className="skeleton-group">
          <div className="skeleton-league">
            <div className="skeleton-league-inner">
              <span className="skeleton-bar skeleton-bar-league" />
            </div>
          </div>

          {Array.from({ length: rowsPerGroup }).map((_, r) => (
            <div key={r} className={`skeleton-row${r === rowsPerGroup - 1 ? ' skeleton-row-last' : ''}`}>
              <div className="skeleton-inner">
                <div className="skeleton-info">
                  <span className="skeleton-bar skeleton-bar-sm" />
                  <span className="skeleton-bar skeleton-bar-lg" />
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
      ))}
    </div>
  );
}
