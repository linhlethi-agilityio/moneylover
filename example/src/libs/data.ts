import { URL } from './url';

export async function fetchLatestInvoices() {
  try {
    const data = await fetch(`${URL.SECOND_URL}${URL.LATEST_INVOICES}`);

    return data.json();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}
