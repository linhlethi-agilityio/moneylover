// Constants
import { Period } from '@/constants';

export const getDay = (date: string): number => new Date(date).getDate();

export const getFullDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const getMonthOffset = (period: string): number => {
  if (period === Period.This) return 0;
  if (period === Period.Last) return -1;
  return Number(period) || 0;
};

export const getMonthLabel = (offset: number): string => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() + offset, 1);

  if (offset === 0) return 'THIS MONTH';
  if (offset === -1) return 'LAST MONTH';

  return date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
};

export const getOffsetKey = (offset: number): string => {
  if (offset === 0) return Period.This;
  if (offset === -1) return Period.Last;
  return String(offset);
};

export const getMonthRange = (period: string) => {
  const now = new Date();

  if (period === Period.Future) {
    const startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
    const endDate = new Date(2099, 11, 31, 23, 59, 59).toISOString();

    return { startDate, endDate, startLabel: 'Future', endLabel: '' };
  }

  const offsetMap: Record<string, number> = { [Period.Last]: -1, [Period.This]: 0 };
  const monthOffset = offsetMap[period] ?? (Number(period) || 0);
  const month = now.getMonth() + monthOffset;

  const startDate = new Date(now.getFullYear(), month, 1).toISOString();
  const endDate = new Date(now.getFullYear(), month + 1, 0, 23, 59, 59).toISOString();

  const formatted = (d: Date) =>
    d.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return {
    startDate,
    endDate,
    startLabel: formatted(new Date(startDate)),
    endLabel: formatted(new Date(endDate)),
  };
};
