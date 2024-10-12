import TransactionHistory, { Transaction } from '@/components/TransactionHistory';
import { useAuth } from '@/context/AuthContext';
import { getTransactions } from '@/lib/firebaseUtils';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

const TransactionHistoryPage: NextPage = () => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user) {
        const fetchedTransactions = await getTransactions(user.uid);
        setTransactions(fetchedTransactions);
      }
    };

    fetchTransactions();
  }, [user]);
  
  return (
    <>
    <h2 >Transaction History</h2>
      <div>
      <TransactionHistory transactions={transactions}/>
      </div>
    </>
  );
};

export default TransactionHistoryPage;
