import type { Category } from '@/types/finance';

// Categorias padrão pré-carregadas (no Checkpoint Final virão do SQLite).
export const categoriesMock: Category[] = [
  { id: 1, nome: 'Alimentação', tipo: 'despesa', icone: 'cart', cor: '#f97316' },
  { id: 2, nome: 'Moradia', tipo: 'despesa', icone: 'home', cor: '#6366f1' },
  { id: 3, nome: 'Transporte', tipo: 'despesa', icone: 'car', cor: '#0ea5e9' },
  { id: 4, nome: 'Lazer', tipo: 'despesa', icone: 'game-controller', cor: '#ec4899' },
  { id: 5, nome: 'Saúde', tipo: 'despesa', icone: 'medkit', cor: '#ef4444' },
  { id: 6, nome: 'Assinaturas', tipo: 'despesa', icone: 'tv', cor: '#8b5cf6' },
  { id: 7, nome: 'Educação', tipo: 'despesa', icone: 'school', cor: '#14b8a6' },
  { id: 8, nome: 'Salário', tipo: 'receita', icone: 'briefcase', cor: '#059669' },
  { id: 9, nome: 'Freelance', tipo: 'receita', icone: 'laptop', cor: '#10b981' },
  { id: 10, nome: 'Investimentos', tipo: 'receita', icone: 'trending-up', cor: '#22c55e' },
];
