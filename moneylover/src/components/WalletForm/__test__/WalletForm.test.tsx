import { fireEvent, render, screen } from '@testing-library/react';

// Mocks
import { MOCK_WALLETS } from '@/mocks';

// Components
import { WalletForm } from '@/components/WalletForm';

describe('WalletForm', () => {
  it('renders create form with default props', () => {
    const { container } = render(<WalletForm userId="user-1" />);
    expect(container).toMatchSnapshot();
  });

  it('renders wallet name input', () => {
    render(<WalletForm userId="user-1" />);
    expect(screen.getByPlaceholderText('e.g. Cash, Bank Account')).toBeInTheDocument();
  });

  it('renders Submit button in create mode', () => {
    render(<WalletForm userId="user-1" />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders Save button in edit mode', () => {
    render(<WalletForm userId="user-1" previewData={MOCK_WALLETS[0]} />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('pre-fills wallet name in edit mode', () => {
    render(<WalletForm userId="user-1" previewData={MOCK_WALLETS[0]} />);
    expect(screen.getByDisplayValue(MOCK_WALLETS[0].name)).toBeInTheDocument();
  });

  it('shows balance input when showBalance is true', () => {
    render(<WalletForm userId="user-1" showBalance />);
    expect(screen.getByText('Initial Balance')).toBeInTheDocument();
  });

  it('does not show balance input when showBalance is false', () => {
    render(<WalletForm userId="user-1" showBalance={false} />);
    expect(screen.queryByText('Initial Balance')).not.toBeInTheDocument();
  });

  it('submit button is disabled when name is empty', () => {
    render(<WalletForm userId="user-1" />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('submit button is enabled after filling wallet name', async () => {
    render(<WalletForm userId="user-1" />);
    fireEvent.change(screen.getByPlaceholderText('e.g. Cash, Bank Account'), {
      target: { value: 'My Wallet' },
    });
    expect(screen.getByRole('button', { name: 'Submit' })).not.toBeDisabled();
  });
});
