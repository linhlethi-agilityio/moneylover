import { CURRENCIES } from '@/constants';

export const formattedBalance = (
  amount: number,
  currencyCode = 'VND',
  showSign = true,
): string => {
  const isPositive = amount >= 0;
  const formatted = Math.abs(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = showSign ? (isPositive ? '+' : '-') : amount < 0 ? '-' : '';
  const symbol = CURRENCIES.find((c) => c.code === currencyCode)?.symbol ?? currencyCode;

  return `${sign}${formatted} ${symbol}`;
};
