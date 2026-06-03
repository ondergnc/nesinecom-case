const currencyFormatter = new Intl.NumberFormat('tr-TR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateTimeFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatCurrency(value: number): string {
  return `${currencyFormatter.format(value)} ₺`;
}

export function formatOdds(value: number): string {
  return value.toFixed(2);
}

export function formatDateTime(timestamp: number): string {
  return dateTimeFormatter.format(timestamp);
}
