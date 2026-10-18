import { Text, View } from 'react-native';

import { formatCurrency } from '@/utils/format';

type SummaryVariant = 'balance' | 'income' | 'expense';

interface SummaryCardProps {
  label: string;
  value: number;
  variant: SummaryVariant;
  className?: string;
}

const styles: Record<SummaryVariant, { container: string; label: string; value: string }> = {
  balance: {
    container: 'bg-brand p-5',
    label: 'text-sm text-emerald-100',
    value: 'mt-1 text-3xl font-bold text-white',
  },
  income: {
    container: 'border border-slate-100 bg-white p-4',
    label: 'text-xs text-slate-500',
    value: 'mt-1 text-lg font-bold text-income',
  },
  expense: {
    container: 'border border-slate-100 bg-white p-4',
    label: 'text-xs text-slate-500',
    value: 'mt-1 text-lg font-bold text-expense',
  },
};

export function SummaryCard({ label, value, variant, className = '' }: SummaryCardProps) {
  const style = styles[variant];

  return (
    <View className={`rounded-2xl ${style.container} ${className}`}>
      <Text className={style.label}>{label}</Text>
      <Text className={style.value}>{formatCurrency(value)}</Text>
    </View>
  );
}
