import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { CategoryIcon } from '@/components/CategoryIcon';
import { EmptyState } from '@/components/EmptyState';
import { useCategory, useTransaction } from '@/store/useFinanceStore';
import { formatBRDate, formatDayLabel } from '@/utils/date';
import { formatSignedCurrency } from '@/utils/format';

interface DetailRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function DetailRow({ label, value, valueClassName = 'text-slate-800' }: DetailRowProps) {
  return (
    <View className="flex-row justify-between gap-4 border-b border-slate-100 py-3">
      <Text className="text-slate-500">{label}</Text>
      <Text className={`flex-1 text-right font-medium ${valueClassName}`}>{value}</Text>
    </View>
  );
}

export default function DetalheTransacaoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const transaction = useTransaction(Number(id));
  const category = useCategory(transaction?.categoria_id);

  if (!transaction) {
    return (
      <EmptyState title="Transação não encontrada">
        <Link href="/extrato" className="font-semibold text-brand">
          Voltar para o extrato
        </Link>
      </EmptyState>
    );
  }

  const isIncome = transaction.tipo === 'receita';
  const isPending = transaction.status === 'pendente';

  return (
    <ScrollView contentContainerClassName="gap-4 p-4">
      <View className="items-center gap-2 py-4">
        {category && <CategoryIcon icon={category.icone} color={category.cor} />}
        <Text className="text-center text-lg font-semibold text-slate-800">
          {transaction.descricao}
        </Text>
        <Text className={`text-3xl font-bold ${isIncome ? 'text-income' : 'text-expense'}`}>
          {formatSignedCurrency(transaction.valor, transaction.tipo)}
        </Text>
      </View>

      <Card>
        <DetailRow label="Tipo" value={isIncome ? 'Receita' : 'Despesa'} />
        <DetailRow label="Categoria" value={category?.nome ?? 'Sem categoria'} />
        <DetailRow
          label="Data"
          value={`${formatBRDate(transaction.data)} (${formatDayLabel(transaction.data)})`}
        />
        <DetailRow
          label="Status"
          value={isPending ? 'Pendente' : isIncome ? 'Recebido' : 'Pago'}
          valueClassName={isPending ? 'text-warning' : 'text-income'}
        />
        {transaction.observacao ? (
          <View className="pt-3">
            <Text className="text-slate-500">Observação</Text>
            <Text className="mt-1 text-slate-800">{transaction.observacao}</Text>
          </View>
        ) : null}
      </Card>
    </ScrollView>
  );
}
