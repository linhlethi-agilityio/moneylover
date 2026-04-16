import { render, screen } from '@testing-library/react';

// Mocks
import {
  MOCK_WALLETS,
  MOCK_GROUPED_BY_CATEGORY,
  MOCK_EXPENSE_CATEGORIES,
  MOCK_INCOME_CATEGORIES,
} from '@/mocks';

// Components
import { TransactionList } from '@/components/TransactionList';

const defaultProps = {
  userId: 'user-1',
  wallets: MOCK_WALLETS,
  inflow: 5000000,
  outflow: 200000,
  groupedByCategory: MOCK_GROUPED_BY_CATEGORY,
  expenseCategories: MOCK_EXPENSE_CATEGORIES,
  incomeCategories: MOCK_INCOME_CATEGORIES,
};

describe('TransactionList', () => {
  it('renders with default props', () => {
    const { container } = render(<TransactionList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders inflow and outflow summary', () => {
    render(<TransactionList {...defaultProps} />);
    expect(screen.getByText('Inflow')).toBeInTheDocument();
    expect(screen.getByText('Outflow')).toBeInTheDocument();
  });

  it('renders category names from grouped transactions', () => {
    render(<TransactionList {...defaultProps} />);
    expect(screen.getByText('Food & Beverage')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Transportation')).toBeInTheDocument();
  });

  it('renders transaction count per category', () => {
    render(<TransactionList {...defaultProps} />);
    const transactionCounts = screen.getAllByText(/Transactions/);
    expect(transactionCounts.length).toBe(3);
  });

  it('renders empty state when no transactions', () => {
    render(<TransactionList {...defaultProps} groupedByCategory={{}} inflow={0} outflow={0} />);
    expect(screen.getByText('No transactions')).toBeInTheDocument();
  });

  it('does not render inflow/outflow summary when no transactions', () => {
    render(<TransactionList {...defaultProps} groupedByCategory={{}} inflow={0} outflow={0} />);
    expect(screen.queryByText('Inflow')).not.toBeInTheDocument();
  });

  it('renders transaction notes', () => {
    render(<TransactionList {...defaultProps} />);
    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('Monthly salary')).toBeInTheDocument();
  });
});
