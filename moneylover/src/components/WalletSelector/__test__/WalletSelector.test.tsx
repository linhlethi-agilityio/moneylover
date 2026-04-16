import { fireEvent, render, screen } from '@testing-library/react';

import { MOCK_WALLETS } from '@/mocks';

import { WalletSelector } from '@/components/WalletSelector';

const defaultProps = {
  userId: 'user-1',
  totalBalance: 6200000,
  currency: 'VND',
  wallets: MOCK_WALLETS,
};

describe('WalletSelector', () => {
  it('renders with default props', () => {
    const { container } = render(<WalletSelector {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders Total label when no wallet selected', () => {
    render(<WalletSelector {...defaultProps} />);
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('does not show wallet list by default', () => {
    render(<WalletSelector {...defaultProps} />);
    expect(screen.queryByText('Included in Total')).not.toBeInTheDocument();
  });

  it('shows wallet list when toggled', () => {
    render(<WalletSelector {...defaultProps} />);
    fireEvent.click(screen.getByText('Total').closest('div')!);
    expect(screen.getByText('Included in Total')).toBeInTheDocument();
  });

  it('shows Add Wallet button in dropdown', () => {
    render(<WalletSelector {...defaultProps} />);
    fireEvent.click(screen.getByText('Total').closest('div')!);
    expect(screen.getByText(/Add Wallet/)).toBeInTheDocument();
  });

  it('opens Add Wallet modal when Add Wallet is clicked', () => {
    render(<WalletSelector {...defaultProps} />);
    fireEvent.click(screen.getByText('Total').closest('div')!);
    fireEvent.click(screen.getByText(/Add Wallet/));
    expect(screen.getByText('Add Wallet')).toBeInTheDocument();
  });

  it('opens delete confirm modal when delete is triggered', () => {
    render(<WalletSelector {...defaultProps} />);
    fireEvent.click(screen.getByText('Total').closest('div')!);
    const menuButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(menuButtons[0]);
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('Delete Wallet')).toBeInTheDocument();
  });

  it('opens edit modal when edit is triggered', () => {
    render(<WalletSelector {...defaultProps} />);
    fireEvent.click(screen.getByText('Total').closest('div')!);
    const menuButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(menuButtons[0]);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Edit Wallet')).toBeInTheDocument();
  });
});
