import { describe, expect, it } from 'vitest';
import { formatCurrency, formatOdds } from './index';

describe('formatCurrency', () => {
  it('iki ondalık ve ₺ ile biçimlendirir', () => {
    expect(formatCurrency(920)).toBe('920,00 ₺');
  });

  it('binlik ayıracı ekler', () => {
    expect(formatCurrency(1234.5)).toBe('1.234,50 ₺');
  });
});

describe('formatOdds', () => {
  it('oranı her zaman iki ondalıkla gösterir', () => {
    expect(formatOdds(1.5)).toBe('1.50');
    expect(formatOdds(7.444)).toBe('7.44');
  });
});
