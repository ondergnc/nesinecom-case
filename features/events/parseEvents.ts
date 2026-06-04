import type { NormalizedEvents } from './interface';

export function parseEventsPayload(text: string): NormalizedEvents {
  const data = JSON.parse(text);
  if (!data || typeof data !== 'object' || !Array.isArray(data.rows) || typeof data.byId !== 'object') {
    throw new Error('Invalid events payload');
  }
  return data as NormalizedEvents;
}
