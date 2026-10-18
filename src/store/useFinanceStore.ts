import { useMemo } from 'react';
import { create } from 'zustand';

import { budgetsMock } from '@/mocks/budgets';
import { categoriesMock } from '@/mocks/categories';
import { transactionsMock } from '@/mocks/transactions';
import type { Budget, Category, Transaction, TransactionFilter } from '@/types/finance';
import { currentMonth } from '@/utils/date';
import {
  filterTransactions,
  getBalance,
  getBudgetsProgress,
  getExpensesByCategory,
  getMonthSummary,
  sortByDateDesc,
} from '@/utils/finance';

interface FinanceState {
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
  filter: TransactionFilter;
  search: string;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  setFilter: (filter: TransactionFilter) => void;
  setSearch: (search: string) => void;
}

// Estado global do app. Por enquanto é populado com mocks e vive só em memória;
// no Checkpoint Final os dados passam a vir dos repositories do SQLite.
export const useFinanceStore = create<FinanceState>()((set) => ({
  categories: categoriesMock,
  transactions: transactionsMock,
  budgets: budgetsMock,
  filter: 'todas',
  search: '',
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        { ...transaction, id: Math.max(0, ...state.transactions.map((t) => t.id)) + 1 },
      ],
    })),
  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),
}));

// Hooks derivados: as telas consomem estes seletores em vez de calcular nos componentes.

export function useBalance() {
  const transactions = useFinanceStore((state) => state.transactions);
  return useMemo(() => getBalance(transactions), [transactions]);
}

export function useMonthSummary(month = currentMonth()) {
  const transactions = useFinanceStore((state) => state.transactions);
  return useMemo(() => getMonthSummary(transactions, month), [transactions, month]);
}

export function useRecentTransactions(limit = 5) {
  const transactions = useFinanceStore((state) => state.transactions);
  return useMemo(() => sortByDateDesc(transactions).slice(0, limit), [transactions, limit]);
}

export function useFilteredTransactions() {
  const transactions = useFinanceStore((state) => state.transactions);
  const filter = useFinanceStore((state) => state.filter);
  const search = useFinanceStore((state) => state.search);
  return useMemo(
    () => sortByDateDesc(filterTransactions(transactions, filter, search)),
    [transactions, filter, search],
  );
}

export function useTransaction(id: number) {
  return useFinanceStore((state) => state.transactions.find((t) => t.id === id));
}

export function useCategoriesById() {
  const categories = useFinanceStore((state) => state.categories);
  return useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);
}

export function useCategory(id: number | undefined) {
  return useFinanceStore((state) => state.categories.find((c) => c.id === id));
}

export function useBudgetsProgress(month = currentMonth()) {
  const budgets = useFinanceStore((state) => state.budgets);
  const categories = useFinanceStore((state) => state.categories);
  const transactions = useFinanceStore((state) => state.transactions);
  return useMemo(
    () => getBudgetsProgress(budgets, categories, transactions, month),
    [budgets, categories, transactions, month],
  );
}

export function useExpensesByCategory(month = currentMonth()) {
  const categories = useFinanceStore((state) => state.categories);
  const transactions = useFinanceStore((state) => state.transactions);
  return useMemo(
    () => getExpensesByCategory(transactions, categories, month),
    [transactions, categories, month],
  );
}
