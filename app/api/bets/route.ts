import { BETS_PATH, normalizeEvents, type RawBetsResponse } from '@/features/events';

const UPSTREAM_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://nesine-case-study.onrender.com';
const REVALIDATE_SECONDS = Number(process.env.BETS_REVALIDATE_SECONDS ?? 15);

export async function GET(): Promise<Response> {
  try {
    const upstream = await fetch(`${UPSTREAM_BASE}${BETS_PATH}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!upstream.ok) {
      return Response.json({ error: `Upstream request failed (HTTP ${upstream.status})` }, { status: 502 });
    }

    const raw = (await upstream.json()) as RawBetsResponse;
    const normalized = normalizeEvents(raw);

    return Response.json(normalized, {
      headers: {
        'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS * 2}`,
      },
    });
  } catch {
    return Response.json({ error: 'Failed to load events' }, { status: 502 });
  }
}
