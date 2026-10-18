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

// Máscara monetária: os dígitos digitados são lidos como centavos ("1550" vira R$ 15,50).
export function parseCurrencyInput(text: string): number {
  const digits = text.replace(/\D/g, '');
  return digits ? Number(digits) / 100 : 0;
}
