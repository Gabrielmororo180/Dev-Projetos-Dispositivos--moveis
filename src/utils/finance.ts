import type {
  Budget,
  Category,
  Transaction,
  TransactionFilter,
  TransactionType,
} from '@/types/finance';
import { monthOf } from '@/utils/date';

export type BudgetLevel = 'seguro' | 'atencao' | 'estourado';

export interface MonthSummary {
  receitas: number;
  despesas: number;
  saldo: number;
}

export interface BudgetProgress {
  budget: Budget;
  category: Category;
  gasto: number;
  percentual: number; // 0.75 = 75%
  nivel: BudgetLevel;
}

export interface CategoryTotal {
  category: Category;
  total: number;
  percentual: number;
}

// Formato compatível com o SectionList: `data` são os itens da seção.
export interface TransactionSection {
  day: string; // YYYY-MM-DD
  data: Transaction[];
}

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

const totalOf = (transactions: Transaction[], tipo: TransactionType) =>
  sum(transactions.filter((t) => t.tipo === tipo).map((t) => t.valor));

export function sortByDateDesc(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => b.data.localeCompare(a.data) || b.id - a.id);
}

export function inMonth(transactions: Transaction[], month: string): Transaction[] {
  return transactions.filter((t) => monthOf(t.data) === month);
}

// Saldo considera apenas o que já foi pago ou recebido.
export function getBalance(transactions: Transaction[]): number {
  const paid = transactions.filter((t) => t.status === 'pago');
  return totalOf(paid, 'receita') - totalOf(paid, 'despesa');
}

export function getMonthSummary(transactions: Transaction[], month: string): MonthSummary {
  const monthTransactions = inMonth(transactions, month);
  const receitas = totalOf(monthTransactions, 'receita');
  const despesas = totalOf(monthTransactions, 'despesa');
  return { receitas, despesas, saldo: receitas - despesas };
}

export function filterTransactions(
  transactions: Transaction[],
  filter: TransactionFilter,
  search: string,
): Transaction[] {
  const term = search.trim().toLowerCase();
  return transactions.filter(
    (t) =>
      (filter === 'todas' || t.tipo === filter) &&
      (term === '' || t.descricao.toLowerCase().includes(term)),
  );
}

export function groupByDay(transactions: Transaction[]): TransactionSection[] {
  const sections: TransactionSection[] = [];
  for (const transaction of sortByDateDesc(transactions)) {
    const last = sections[sections.length - 1];
    if (last?.day === transaction.data) {
      last.data.push(transaction);
    } else {
      sections.push({ day: transaction.data, data: [transaction] });
    }
  }
  return sections;
}

export function getBudgetLevel(percentual: number): BudgetLevel {
  if (percentual >= 1) return 'estourado';
  if (percentual >= 0.8) return 'atencao';
  return 'seguro';
}

export function getBudgetsProgress(
  budgets: Budget[],
  categories: Category[],
  transactions: Transaction[],
  month: string,
): BudgetProgress[] {
  const expenses = inMonth(transactions, month).filter((t) => t.tipo === 'despesa');

  return budgets
    .filter((budget) => budget.mes_ano === month)
    .flatMap((budget) => {
      const category = categories.find((c) => c.id === budget.categoria_id);
      if (!category) return [];

      const gasto = sum(
        expenses.filter((t) => t.categoria_id === budget.categoria_id).map((t) => t.valor),
      );
      const percentual = budget.valor_limite > 0 ? gasto / budget.valor_limite : 0;
      return [{ budget, category, gasto, percentual, nivel: getBudgetLevel(percentual) }];
    });
}

export function getBudgetTotals(progress: BudgetProgress[]) {
  const limite = sum(progress.map((item) => item.budget.valor_limite));
  const gasto = sum(progress.map((item) => item.gasto));
  return { limite, gasto, percentual: limite > 0 ? gasto / limite : 0 };
}

export function getExpensesByCategory(
  transactions: Transaction[],
  categories: Category[],
  month: string,
): CategoryTotal[] {
  const expenses = inMonth(transactions, month).filter((t) => t.tipo === 'despesa');
  const totalGeral = sum(expenses.map((t) => t.valor));

  return categories
    .map((category) => {
      const total = sum(expenses.filter((t) => t.categoria_id === category.id).map((t) => t.valor));
      return { category, total, percentual: totalGeral > 0 ? total / totalGeral : 0 };
    })
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total);
}
