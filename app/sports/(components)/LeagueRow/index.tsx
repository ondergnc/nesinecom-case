'use client';

import { memo } from 'react';
import type { LeagueRowProps } from './interface';
import './style.scss';

function LeagueRowBase({ league, style }: LeagueRowProps) {
  return (
    <div className="league-row" style={style}>
      <div className="league-row-inner">
        <span className="league-row-name">{league}</span>
      </div>
    </div>
  );
}

export default memo(LeagueRowBase);
