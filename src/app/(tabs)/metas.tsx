import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { BudgetProgress, levelStyles } from '@/components/BudgetProgress';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { ProgressBar } from '@/components/ProgressBar';
import { useBudgetsProgress } from '@/store/useFinanceStore';
import { currentMonth, formatMonthLabel } from '@/utils/date';
import { getBudgetLevel, getBudgetTotals } from '@/utils/finance';
import { formatCurrency, formatPercent } from '@/utils/format';

export default function MetasScreen() {
  const progress = useBudgetsProgress();
  const totals = useMemo(() => getBudgetTotals(progress), [progress]);

  return (
    <ScrollView contentContainerClassName="gap-4 p-4 pb-8">
      <Text className="text-xl font-bold text-slate-800">{formatMonthLabel(currentMonth())}</Text>

      <Card>
        <Text className="text-sm text-slate-500">Orçamento total previsto</Text>
        <Text className="mt-1 text-2xl font-bold text-slate-800">
          {formatPercent(totals.percentual)} consumido
        </Text>
        <View className="my-3">
          <ProgressBar
            progress={totals.percentual}
            barClassName={levelStyles[getBudgetLevel(totals.percentual)].bar}
          />
        </View>
        <Text className="text-sm text-slate-500">
          {formatCurrency(totals.gasto)} de {formatCurrency(totals.limite)}
        </Text>
      </Card>

      <Card>
        <Card.Header title="Categorias com limite" />
        <Card.Body>
          {progress.length === 0 ? (
            <EmptyState title="Nenhuma meta definida para este mês" />
          ) : (
            progress.map((item) => (
              <BudgetProgress
                key={item.budget.id}
                title={item.category.nome}
                spent={item.gasto}
                limit={item.budget.valor_limite}
                category={item.category}
              />
            ))
          )}
        </Card.Body>
        <Card.Footer>
          <Text className="text-xs text-slate-400">
            Verde até 79%, amarelo de 80% a 99% e vermelho a partir de 100% do limite.
          </Text>
        </Card.Footer>
      </Card>
    </ScrollView>
  );
}
