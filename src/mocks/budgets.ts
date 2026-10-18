import type { Budget } from '@/types/finance';
import { currentMonth } from '@/utils/date';

const mes = currentMonth();

// Metas do mês atual, com valores que exercitam os três níveis de alerta
// (seguro, atenção e estourado) junto com src/mocks/transactions.ts.
export const budgetsMock: Budget[] = [
  { id: 1, categoria_id: 1, valor_limite: 900, mes_ano: mes },
  { id: 2, categoria_id: 2, valor_limite: 850, mes_ano: mes },
  { id: 3, categoria_id: 3, valor_limite: 400, mes_ano: mes },
  { id: 4, categoria_id: 4, valor_limite: 400, mes_ano: mes },
  { id: 5, categoria_id: 5, valor_limite: 250, mes_ano: mes },
];
