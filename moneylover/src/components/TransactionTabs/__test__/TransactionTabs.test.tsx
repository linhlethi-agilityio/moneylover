import { render, screen } from '@testing-library/react';

import { TransactionTabs } from '@/components/TransactionTabs';

const mockPush = jest.fn();

describe('TransactionTabs', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders with this month period', () => {
    const { container } = render(<TransactionTabs period="this" />);
    expect(container).toMatchSnapshot();
  });

  it('renders 3 tab buttons', () => {
    render(<TransactionTabs period="this" />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('renders THIS MONTH tab as active for "this" period', () => {
    render(<TransactionTabs period="this" />);
    const activeTab = screen.getByText('THIS MONTH');
    expect(activeTab).toHaveClass('text-lime-600');
  });

  it('renders FUTURE tab when period is future', () => {
    render(<TransactionTabs period="future" />);
    expect(screen.getByText('FUTURE')).toBeInTheDocument();
  });
});
