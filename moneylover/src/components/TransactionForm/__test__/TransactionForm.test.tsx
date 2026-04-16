import { fireEvent, render, screen } from '@testing-library/react';

// Mocks
import {
  MOCK_WALLETS,
  MOCK_TRANSACTIONS_WITH_CATEGORY,
  MOCK_EXPENSE_CATEGORIES,
  MOCK_INCOME_CATEGORIES,
} from '@/mocks';

// Components
import { TransactionForm } from '@/components/TransactionForm';

const defaultProps = {
  userId: 'user-1',
  wallets: MOCK_WALLETS,
  expenseCategories: MOCK_EXPENSE_CATEGORIES,
  incomeCategories: MOCK_INCOME_CATEGORIES,
  onSubmit: jest.fn(),
};

describe('TransactionForm', () => {
  it('renders with default props', () => {
    const { container } = render(<TransactionForm {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders Type, Wallet, Category, Amount, Date fields', () => {
    render(<TransactionForm {...defaultProps} />);
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Wallet')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('renders Expense and Income type buttons', () => {
    render(<TransactionForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Expense' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Income' })).toBeInTheDocument();
  });

  it('renders Submit button in create mode', () => {
    render(<TransactionForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('submit button is disabled when required fields are empty', () => {
    render(<TransactionForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('renders in edit mode with previewData', () => {
    render(<TransactionForm {...defaultProps} previewData={MOCK_TRANSACTIONS_WITH_CATEGORY[0]} />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders Note optional field', () => {
    render(<TransactionForm {...defaultProps} />);
    expect(screen.getByPlaceholderText('Add a note...')).toBeInTheDocument();
  });

  it('switches to Income type when Income button is clicked', () => {
    render(<TransactionForm {...defaultProps} />);
    const incomeBtn = screen.getByRole('button', { name: 'Income' });
    fireEvent.click(incomeBtn);
    expect(incomeBtn).toHaveClass('text-lime-700');
  });
});
