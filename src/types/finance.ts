import type Ionicons from '@expo/vector-icons/Ionicons';

// Tipos de domínio espelhando o DER do README (tabelas CATEGORIA, TRANSACAO e META).

export type TransactionType = 'receita' | 'despesa';
export type TransactionStatus = 'pago' | 'pendente';
export type CategoryIcon = keyof typeof Ionicons.glyphMap;

export interface Category {
  id: number;
  nome: string;
  tipo: TransactionType;
  icone: CategoryIcon;
  cor: string;
}

export interface Transaction {
  id: number;
  descricao: string;
  valor: number;
  data: string; // YYYY-MM-DD
  tipo: TransactionType;
  categoria_id: number;
  status: TransactionStatus;
  observacao?: string | null;
}

export interface Budget {
  id: number;
  categoria_id: number;
  valor_limite: number;
  mes_ano: string; // YYYY-MM
}

export type TransactionFilter = 'todas' | TransactionType;
