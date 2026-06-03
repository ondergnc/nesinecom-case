import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithStore } from '@/test/render';
import SportsPage from './page';

const loader = vi.hoisted(() => ({
  current: {
    isRevalidating: false,
    isEmpty: false,
    error: null as string | null,
    reload: () => {},
  },
}));

vi.mock('@/hooks/useEventsLoader', () => ({
  useEventsLoader: () => loader.current,
}));

describe('SportsPage', () => {
  it('başlık ve geçmiş bağlantısını gösterir', () => {
    loader.current = { isRevalidating: false, isEmpty: true, error: null, reload: () => {} };
    renderWithStore(<SportsPage />);
    expect(screen.getByRole('heading', { name: 'Spor' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Geçmiş' })).toBeInTheDocument();
  });

  it('maç yoksa boş durum gösterir', () => {
    loader.current = { isRevalidating: false, isEmpty: true, error: null, reload: () => {} };
    renderWithStore(<SportsPage />);
    expect(screen.getByText('Maç yok')).toBeInTheDocument();
  });

  it('hata olduğunda mesaj ve tekrar dene butonu gösterir', () => {
    loader.current = { isRevalidating: false, isEmpty: false, error: 'Bağlantı hatası', reload: vi.fn() };
    renderWithStore(<SportsPage />);
    expect(screen.getByText('Bağlantı hatası')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tekrar Dene' })).toBeInTheDocument();
  });
});
