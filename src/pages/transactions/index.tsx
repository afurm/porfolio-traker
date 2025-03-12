import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionStats } from '@/components/transactions/TransactionStats';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { GET_USER_TRANSACTIONS } from '@/graphql/transactions';
import { fadeIn } from '@/animations/framer';

interface Transaction {
  id: string;
  date: string;
  transactionType: string;
  asset: string;
  amount: number;
  price: number;
  totalValue: number;
  status: string;
}

interface FilterOptions {
  startDate?: string;
  endDate?: string;
  transactionType?: string;
  asset?: string;
}

export default function TransactionsPage() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(
    undefined
  );

  const { loading, error, data, refetch } = useQuery(GET_USER_TRANSACTIONS, {
    variables: filters,
    fetchPolicy: 'network-only',
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleAddTransaction = () => {
    setSelectedTransaction(undefined);
    setIsFormOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    refetch();
  };

  const transactions = data?.userTransactions || [];

  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="relative container mx-auto py-8 px-4"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Transactions
            </h1>
            <p className="text-muted-foreground mt-2">
              Track and analyze your cryptocurrency transactions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button onClick={handleAddTransaction} className="gap-2">
              <Icon name="Plus" className="h-4 w-4" />
              Add Transaction
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ perspective: '1000px' }}
        >
          <div className="space-y-6">
            <motion.div
              whileHover={{ transform: 'translateZ(10px)' }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <TransactionFilters onFilterChange={handleFilterChange} />
            </motion.div>

            <motion.div
              whileHover={{ transform: 'translateZ(10px)' }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <TransactionStats transactions={transactions} />
            </motion.div>

            <motion.div
              whileHover={{ transform: 'translateZ(10px)' }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <TransactionTable filters={filters} onEdit={handleEditTransaction} />
            </motion.div>
          </div>
        </motion.div>

        <TransactionForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleFormSuccess}
          transaction={selectedTransaction}
        />
      </motion.div>
    </div>
  );
}
