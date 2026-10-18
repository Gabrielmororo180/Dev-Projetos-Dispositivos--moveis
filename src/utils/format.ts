const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatSignedCurrency(value: number, tipo: 'receita' | 'despesa'): string {
  return `${tipo === 'receita' ? '+' : '-'} ${formatCurrency(Math.abs(value))}`;
}

export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
