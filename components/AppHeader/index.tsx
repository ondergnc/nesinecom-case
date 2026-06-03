import Link from 'next/link';
import type { AppHeaderProps } from './interface';
import './style.scss';

export default function AppHeader({ title, count, countSuffix = '', action }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-header-brand">
          <h1 className="app-header-title">{title}</h1>
          {count !== undefined && (
            <span className="app-header-count">
              {count}
              {countSuffix && ` ${countSuffix}`}
            </span>
          )}
        </div>

        {action && (
          <Link className="app-header-action" href={action.href}>
            {action.label}
          </Link>
        )}
      </div>
    </header>
  );
}
