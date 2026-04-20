'use server';

// Constants
import { CACHE_TAGS } from '@/constants';

import { updateTag } from 'next/cache';

// Actions
import { createWallet, updateWallet, deleteWallet } from '../wallet';

// Libs
import { addWallet, editWallet, removeWallet } from '@/libs';

jest.mock('@/libs', () => ({
  addWallet: jest.fn(),
  editWallet: jest.fn(),
  removeWallet: jest.fn(),
}));

describe('createWallet', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call addWallet and updateTag on success', async () => {
    (addWallet as jest.Mock).mockResolvedValue({ error: null });

    await createWallet({ userId: 'user-1', name: 'Cash', currency: 'VND', balance: 100000 });

    expect(addWallet).toHaveBeenCalledWith({
      user_id: 'user-1',
      name: 'Cash',
      currency: 'VND',
      balance: 100000,
    });
    expect(updateTag).toHaveBeenCalledWith(CACHE_TAGS.WALLETS);
  });

  it('should default balance to 0 when not provided', async () => {
    (addWallet as jest.Mock).mockResolvedValue({ error: null });

    await createWallet({ userId: 'user-1', name: 'Cash', currency: 'VND' });

    expect(addWallet).toHaveBeenCalledWith({
      user_id: 'user-1',
      name: 'Cash',
      currency: 'VND',
      balance: 0,
    });
  });

  it('should return error message when addWallet fails', async () => {
    (addWallet as jest.Mock).mockResolvedValue({ error: { message: 'Insert failed' } });

    const result = await createWallet({ userId: 'user-1', name: 'Cash', currency: 'VND' });

    expect(result).toBe('Insert failed');
    expect(updateTag).not.toHaveBeenCalled();
  });
});

describe('updateWallet', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call editWallet and updateTag on success', async () => {
    (editWallet as jest.Mock).mockResolvedValue({ error: null });

    await updateWallet({ id: '1', name: 'Bank', currency: 'VND', balance: 500000 });

    expect(editWallet).toHaveBeenCalledWith({
      id: '1',
      name: 'Bank',
      currency: 'VND',
      balance: 500000,
    });
    expect(updateTag).toHaveBeenCalledWith(CACHE_TAGS.WALLETS);
  });

  it('should return error message when editWallet fails', async () => {
    (editWallet as jest.Mock).mockResolvedValue({ error: { message: 'Update failed' } });

    const result = await updateWallet({ id: '1', name: 'Bank', currency: 'VND' });

    expect(result).toBe('Update failed');
    expect(updateTag).not.toHaveBeenCalled();
  });
});

describe('deleteWallet', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call removeWallet and updateTag on success', async () => {
    (removeWallet as jest.Mock).mockResolvedValue({ error: null });

    await deleteWallet('1');

    expect(removeWallet).toHaveBeenCalledWith('1');
    expect(updateTag).toHaveBeenCalledWith(CACHE_TAGS.WALLETS);
    expect(updateTag).toHaveBeenCalledWith(CACHE_TAGS.TRANSACTIONS);
  });

  it('should return error message when removeWallet fails', async () => {
    (removeWallet as jest.Mock).mockResolvedValue({ error: { message: 'Delete failed' } });

    const result = await deleteWallet('1');

    expect(result).toBe('Delete failed');
    expect(updateTag).not.toHaveBeenCalled();
  });
});
