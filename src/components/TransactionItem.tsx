import { Pressable, Text, View } from 'react-native';

import { CategoryIcon } from '@/components/CategoryIcon';
import type { Category, Transaction } from '@/types/finance';
import { formatShortDate } from '@/utils/date';
import { formatSignedCurrency } from '@/utils/format';

interface TransactionItemProps {
  transaction: Transaction;
  category?: Category;
  onPress?: (id: number) => void;
}

export function TransactionItem({ transaction, category, onPress }: TransactionItemProps) {
  const isIncome = transaction.tipo === 'receita';

  return (
    <Pressable
      onPress={() => onPress?.(transaction.id)}
      disabled={!onPress}
      className="flex-row items-center gap-3 py-3 active:opacity-60"
      accessibilityRole="button"
    >
      {category && <CategoryIcon icon={category.icone} color={category.cor} />}

      <View className="flex-1">
        <Text className="font-medium text-slate-800" numberOfLines={1}>
          {transaction.descricao}
        </Text>
        <Text className="text-xs text-slate-400">
          {formatShortDate(transaction.data)}
          {category ? ` • ${category.nome}` : ''}
        </Text>
      </View>

      <View className="items-end">
        <Text className={`font-semibold ${isIncome ? 'text-income' : 'text-expense'}`}>
          {formatSignedCurrency(transaction.valor, transaction.tipo)}
        </Text>
        {transaction.status === 'pendente' && (
          <Text className="text-xs font-medium text-warning">Pendente</Text>
        )}
      </View>
    </Pressable>
  );
}
