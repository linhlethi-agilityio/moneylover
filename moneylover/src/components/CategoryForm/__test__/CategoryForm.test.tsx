import { fireEvent, render, screen } from '@testing-library/react';

import { MOCK_CATEGORIES, MOCK_EXPENSE_CATEGORIES, MOCK_INCOME_CATEGORIES } from '@/mocks';

import { CategoryForm } from '@/components/CategoryForm';

const defaultProps = {
  userId: 'user-1',
  expenseCategories: MOCK_EXPENSE_CATEGORIES,
  incomeCategories: MOCK_INCOME_CATEGORIES,
  onSubmit: jest.fn(),
};

describe('CategoryForm', () => {
  it('renders with default props', () => {
    const { container } = render(<CategoryForm {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders Category Name input', () => {
    render(<CategoryForm {...defaultProps} />);
    expect(screen.getByPlaceholderText('e.g. Restaurant, Coffee')).toBeInTheDocument();
  });

  it('renders Expense and Income type buttons', () => {
    render(<CategoryForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Expense' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Income' })).toBeInTheDocument();
  });

  it('renders Submit button in create mode', () => {
    render(<CategoryForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders Save button in edit mode', () => {
    render(<CategoryForm {...defaultProps} previewData={MOCK_CATEGORIES[0]} />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('pre-fills name in edit mode', () => {
    render(<CategoryForm {...defaultProps} previewData={MOCK_CATEGORIES[0]} />);
    expect(screen.getByDisplayValue(MOCK_CATEGORIES[0].name)).toBeInTheDocument();
  });

  it('submit button is disabled when name is empty', () => {
    render(<CategoryForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('submit button is enabled after filling name', () => {
    render(<CategoryForm {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText('e.g. Restaurant, Coffee'), {
      target: { value: 'My Category' },
    });
    expect(screen.getByRole('button', { name: 'Submit' })).not.toBeDisabled();
  });

  it('type buttons are disabled in edit mode', () => {
    render(<CategoryForm {...defaultProps} previewData={MOCK_CATEGORIES[0]} />);
    expect(screen.getByRole('button', { name: 'Expense' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Income' })).toBeDisabled();
  });
});
