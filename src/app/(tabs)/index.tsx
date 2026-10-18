import { Link, router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { Fab } from '@/components/Fab';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionItem } from '@/components/TransactionItem';
import {
  useBalance,
  useCategoriesById,
  useMonthSummary,
  useRecentTransactions,
} from '@/store/useFinanceStore';
import type { TransactionType } from '@/types/finance';
import { currentMonth, formatMonthLabel } from '@/utils/date';

export default function DashboardScreen() {
  const balance = useBalance();
  const summary = useMonthSummary();
  const recent = useRecentTransactions(5);
  const categoriesById = useCategoriesById();

  const openNewTransaction = (tipo?: TransactionType) =>
    router.push({ pathname: '/transacao/nova', params: tipo ? { tipo } : {} });

  const openTransaction = (id: number) =>
    router.push({ pathname: '/transacao/[id]', params: { id: String(id) } });

  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="gap-4 p-4 pb-24">
        <View>
          <Text className="text-sm text-slate-500">Bem-vindo de volta</Text>
          <Text className="text-xl font-bold text-slate-800">
            Resumo de {formatMonthLabel(currentMonth())}
          </Text>
        </View>

        <SummaryCard label="Saldo disponível" value={balance} variant="balance" />

        <View className="flex-row gap-3">
          <SummaryCard
            className="flex-1"
            label="Receitas do mês"
            value={summary.receitas}
            variant="income"
          />
          <SummaryCard
            className="flex-1"
            label="Despesas do mês"
            value={summary.despesas}
            variant="expense"
          />
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPress={() => openNewTransaction('receita')}
            className="flex-1 items-center rounded-xl bg-emerald-50 py-3 active:opacity-70"
          >
            <Text className="font-semibold text-income">Nova receita</Text>
          </Pressable>
          <Pressable
            onPress={() => openNewTransaction('despesa')}
            className="flex-1 items-center rounded-xl bg-rose-50 py-3 active:opacity-70"
          >
            <Text className="font-semibold text-expense">Nova despesa</Text>
          </Pressable>
        </View>

        <Card>
          <Card.Header
            title="Últimas transações"
            action={
              <Link href="/extrato" className="text-sm font-medium text-brand">
                Ver todas
              </Link>
            }
          />
          <Card.Body>
            {recent.length === 0 ? (
              <EmptyState title="Nenhuma transação registrada" />
            ) : (
              recent.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  category={categoriesById.get(transaction.categoria_id)}
                  onPress={openTransaction}
                />
              ))
            )}
          </Card.Body>
        </Card>
      </ScrollView>

      <Fab onPress={() => openNewTransaction()} accessibilityLabel="Nova movimentação" />
    </View>
  );
}
