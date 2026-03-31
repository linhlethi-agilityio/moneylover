export const formattedBalance = (amount: number, currency = 'đ'): string => {
  const isPositive = amount >= 0;
  const formatted = Math.abs(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = isPositive ? '+' : '-';

  return `${sign}${formatted} ${currency}`;
};
