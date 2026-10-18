import { router } from 'expo-router';
import { useMemo } from 'react';
import { SectionList, Text, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { FilterChips, type FilterOption } from '@/components/FilterChips';
import { SearchBar } from '@/components/SearchBar';
import { TransactionItem } from '@/components/TransactionItem';
import {
  useCategoriesById,
  useFilteredTransactions,
  useFinanceStore,
} from '@/store/useFinanceStore';
import type { TransactionFilter } from '@/types/finance';
import { formatDayLabel } from '@/utils/date';
import { filterTransactions, groupByDay } from '@/utils/finance';

const FILTERS: { value: TransactionFilter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'receita', label: 'Receitas' },
  { value: 'despesa', label: 'Despesas' },
];

export default function ExtratoScreen() {
  const transactions = useFinanceStore((state) => state.transactions);
  const filter = useFinanceStore((state) => state.filter);
  const search = useFinanceStore((state) => state.search);
  const setFilter = useFinanceStore((state) => state.setFilter);
  const setSearch = useFinanceStore((state) => state.setSearch);
  const filtered = useFilteredTransactions();
  const categoriesById = useCategoriesById();

  const sections = useMemo(() => groupByDay(filtered), [filtered]);

  // Cada chip mostra quantas transações existem naquele filtro, considerando a busca atual.
  const filterOptions = useMemo<FilterOption<TransactionFilter>[]>(
    () =>
      FILTERS.map((option) => ({
        value: option.value,
        label: `${option.label} (${filterTransactions(transactions, option.value, search).length})`,
      })),
    [transactions, search],
  );

  return (
    <View className="flex-1">
      <View className="gap-3 px-4 pb-2 pt-4">
        <SearchBar value={search} onChangeText={setSearch} placeholder="Buscar por descrição" />
        <FilterChips options={filterOptions} selected={filter} onChange={setFilter} />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => String(item.id)}
        // SectionList não tem suporte a contentContainerClassName no NativeWind 4.
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        stickySectionHeadersEnabled={false}
        // Conta cabeçalhos e itens; 20 preenche a primeira tela sem esperar o próximo quadro.
        initialNumToRender={20}
        keyboardShouldPersistTaps="handled"
        renderSectionHeader={({ section }) => (
          <Text className="pb-1 pt-4 text-xs font-semibold uppercase text-slate-400">
            {formatDayLabel(section.day)}
          </Text>
        )}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            category={categoriesById.get(item.categoria_id)}
            onPress={(id) =>
              router.push({ pathname: '/transacao/[id]', params: { id: String(id) } })
            }
          />
        )}
        ListEmptyComponent={
          <EmptyState title="Nenhuma transação encontrada">
            <Text className="text-center text-sm text-slate-500">
              Tente outro termo de busca ou altere o filtro.
            </Text>
          </EmptyState>
        }
      />
    </View>
  );
}
