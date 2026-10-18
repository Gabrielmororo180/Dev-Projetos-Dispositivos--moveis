const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

const pad = (value: number) => String(value).padStart(2, '0');

// Datas são tratadas como texto YYYY-MM-DD (formato do banco) para evitar problemas de fuso horário.
export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function monthOf(iso: string): string {
  return iso.slice(0, 7);
}

export function currentMonth(today = new Date()): string {
  return monthOf(toISODate(today));
}

export function previousMonth(month: string): string {
  const [year, monthNumber] = month.split('-').map(Number);
  return monthOf(toISODate(new Date(year, monthNumber - 2, 1)));
}

export function monthName(month: string): string {
  return MONTHS[Number(month.slice(5, 7)) - 1];
}

export function formatMonthLabel(month: string): string {
  const name = monthName(month);
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${month.slice(0, 4)}`;
}

export function formatShortDate(iso: string): string {
  const date = parseISODate(iso);
  return `${pad(date.getDate())} ${MONTHS[date.getMonth()].slice(0, 3)}`;
}

export function formatDayLabel(iso: string, today = new Date()): string {
  const todayIso = toISODate(today);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (iso === todayIso) return 'Hoje';
  if (iso === toISODate(yesterday)) return 'Ontem';

  const date = parseISODate(iso);
  return `${date.getDate()} de ${MONTHS[date.getMonth()]}`;
}

export function formatBRDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

// Converte DD/MM/AAAA para YYYY-MM-DD; retorna null se a data não existir.
export function parseBRDate(text: string): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text.trim());
  if (!match) return null;

  const [, day, month, year] = match.map(Number);
  const date = new Date(year, month - 1, day);
  const valid =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return valid ? toISODate(date) : null;
}

// Máscara de digitação DD/MM/AAAA.
export function maskBRDate(text: string): string {
  const digits = text.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean).join('/');
}
