import { mockTransactions } from './mock/data';

export interface Transaction {
  coinId: string;
  amount: number;
  price: number;
}

// Mock API function to add a transaction
export async function addTransaction(transaction: Transaction): Promise<Transaction> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app, this would be an API call to your backend
  const newTransaction = {
    ...transaction,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
  };

  // For now, just log the transaction
  console.log('Added transaction:', newTransaction);

  return newTransaction;
}
