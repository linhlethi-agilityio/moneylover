// Utils
import { formattedBalance } from '@/utils/number';

describe('formattedBalance', () => {
  it('formats amount with commas', () => {
    expect(formattedBalance(1000000, 'VND', false)).toBe('1,000,000 đ');
  });

  it('shows + sign for positive amount when showSign is true', () => {
    expect(formattedBalance(500000, 'VND', true)).toBe('+500,000 đ');
  });

  it('shows - sign for negative amount when showSign is true', () => {
    expect(formattedBalance(-500000, 'VND', true)).toBe('-500,000 đ');
  });

  it('does not show sign when showSign is false', () => {
    const result = formattedBalance(500000, 'VND', false);
    expect(result).not.toContain('+');
    expect(result).not.toContain('-');
  });

  it('prepends minus sign when outflow is true', () => {
    expect(formattedBalance(500000, 'VND', false, true)).toBe('-500,000 đ');
  });

  it('uses currency symbol', () => {
    expect(formattedBalance(100, 'USD', false)).toContain('$');
  });

  it('falls back to currency code when symbol not found', () => {
    expect(formattedBalance(100, 'XYZ', false)).toContain('XYZ');
  });

  it('handles zero amount', () => {
    expect(formattedBalance(0, 'VND', false)).toBe('0 đ');
  });
});
