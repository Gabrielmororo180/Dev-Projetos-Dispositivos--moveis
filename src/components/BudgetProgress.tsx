import { Text, View } from 'react-native';

import { CategoryIcon } from '@/components/CategoryIcon';
import { ProgressBar } from '@/components/ProgressBar';
import type { Category } from '@/types/finance';
import { getBudgetLevel, type BudgetLevel } from '@/utils/finance';
import { formatCurrency, formatPercent } from '@/utils/format';

interface BudgetProgressProps {
  title: string;
  spent: number;
  limit: number;
  category?: Category;
}

export const levelStyles: Record<BudgetLevel, { bar: string; text: string }> = {
  seguro: { bar: 'bg-income', text: 'text-income' },
  atencao: { bar: 'bg-warning', text: 'text-warning' },
  estourado: { bar: 'bg-expense', text: 'text-expense' },
};

function levelLabel(percentual: number): string {
  if (percentual > 1) return 'ultrapassado';
  if (percentual === 1) return 'atingido';
  return '';
}

export function BudgetProgress({ title, spent, limit, category }: BudgetProgressProps) {
  const percentual = limit > 0 ? spent / limit : 0;
  const style = levelStyles[getBudgetLevel(percentual)];
  const label = levelLabel(percentual);

  return (
    <View className="gap-2 py-3">
      <View className="flex-row items-center gap-3">
        {category && <CategoryIcon icon={category.icone} color={category.cor} size="sm" />}
        <Text className="flex-1 font-medium text-slate-800">{title}</Text>
        <Text className={`font-semibold ${style.text}`}>
          {formatPercent(percentual)}
          {label ? ` (${label})` : ''}
        </Text>
      </View>

      <ProgressBar progress={percentual} barClassName={style.bar} />

      <View className="flex-row justify-between">
        <Text className="text-xs text-slate-500">Gasto: {formatCurrency(spent)}</Text>
        <Text className="text-xs text-slate-500">Limite: {formatCurrency(limit)}</Text>
      </View>
    </View>
  );
}
