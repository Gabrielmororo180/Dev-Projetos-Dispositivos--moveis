import { ScrollView, Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { CategoryIcon } from '@/components/CategoryIcon';
import { EmptyState } from '@/components/EmptyState';
import { ProgressBar } from '@/components/ProgressBar';
import { useExpensesByCategory, useMonthSummary } from '@/store/useFinanceStore';
import { currentMonth, formatMonthLabel, monthName, previousMonth } from '@/utils/date';
import { formatCurrency, formatPercent } from '@/utils/format';

interface SummaryRowProps {
  label: string;
  value: number;
  valueClassName?: string;
}

function SummaryRow({ label, value, valueClassName = 'text-slate-800' }: SummaryRowProps) {
  return (
    <View className="flex-row justify-between py-1">
      <Text className="text-slate-600">{label}</Text>
      <Text className={`font-semibold ${valueClassName}`}>{formatCurrency(value)}</Text>
    </View>
  );
}

export default function RelatoriosScreen() {
  const month = currentMonth();
  const lastMonth = previousMonth(month);
  const summary = useMonthSummary(month);
  const lastSummary = useMonthSummary(lastMonth);
  const expenses = useExpensesByCategory(month);
  const savingsRate = summary.receitas > 0 ? summary.saldo / summary.receitas : 0;

  return (
    <ScrollView contentContainerClassName="gap-4 p-4 pb-8">
      <Text className="text-xl font-bold text-slate-800">{formatMonthLabel(month)}</Text>

      <Card>
        <Card.Header title="Balanço do mês" />
        <Card.Body>
          <SummaryRow label="Receitas" value={summary.receitas} valueClassName="text-income" />
          <SummaryRow label="Despesas" value={summary.despesas} valueClassName="text-expense" />
        </Card.Body>
        <Card.Footer>
          <SummaryRow
            label="Saldo do mês"
            value={summary.saldo}
            valueClassName={summary.saldo >= 0 ? 'text-income' : 'text-expense'}
          />
          <Text className="mt-1 text-xs text-slate-500">
            {summary.saldo >= 0
              ? `Você economizou ${formatPercent(savingsRate)} do que recebeu este mês.`
              : 'As despesas do mês superaram as receitas.'}
          </Text>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Header title="Despesas por categoria" />
        <Card.Body>
          {expenses.length === 0 ? (
            <EmptyState title="Nenhuma despesa neste mês" />
          ) : (
            expenses.map(({ category, total, percentual }) => (
              <View key={category.id} className="gap-2 py-2">
                <View className="flex-row items-center gap-3">
                  <CategoryIcon icon={category.icone} color={category.cor} size="sm" />
                  <Text className="flex-1 font-medium text-slate-800">{category.nome}</Text>
                  <Text className="text-sm text-slate-500">{formatPercent(percentual)}</Text>
                  <Text className="w-24 text-right font-semibold text-slate-800">
                    {formatCurrency(total)}
                  </Text>
                </View>
                <ProgressBar progress={percentual} color={category.cor} />
              </View>
            ))
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={`Comparativo com ${monthName(lastMonth)}`} />
        <Card.Body>
          <SummaryRow label="Receitas" value={lastSummary.receitas} valueClassName="text-income" />
          <SummaryRow label="Despesas" value={lastSummary.despesas} valueClassName="text-expense" />
          <SummaryRow label="Saldo" value={lastSummary.saldo} />
        </Card.Body>
      </Card>
    </ScrollView>
  );
}
