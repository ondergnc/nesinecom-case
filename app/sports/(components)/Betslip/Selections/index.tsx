'use client';

import { useAppSelector } from '@/store/hooks';
import { selectBetslipItems } from '@/features/betslip';
import SelectionItem from './SelectionItem';
import './style.scss';

export default function Selections() {
  const items = useAppSelector(selectBetslipItems);

  return (
    <div className="selections">
      {items.map((selection) => (
        <SelectionItem key={selection.eventId} selection={selection} />
      ))}
    </div>
  );
}
