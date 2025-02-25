import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionStats } from '@/components/transactions/TransactionStats';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { fadeIn } from '@/animations/framer';

interface FilterOptions {
  startDate?: string;
  endDate?: string;
  type?: 'buy' | 'sell';
  asset?: string;
  minAmount?: number;
  maxAmount?: number;
}

// Mock data - replace with real data from your API
const mockTransactions = [
  {
    id: '1',
    date: '2024-03-20',
    type: 'buy' as const,
    asset: 'BTC',
    amount: 0.5,
    price: 65000,
    total: 32500,
    status: 'completed' as const,
  },
  {
    id: '2',
    date: '2024-03-19',
    type: 'sell' as const,
    asset: 'ETH',
    amount: 2.5,
    price: 3500,
    total: 8750,
    status: 'completed' as const,
  },
];

const mockStats = {
  totalTransactions: 150,
  totalVolume: 1250000,
  buyVolume: 750000,
  sellVolume: 500000,
  averageTransactionSize: 8333.33,
};

export default function TransactionsPage() {
  const [transactions] = useState(mockTransactions);

  const handleFilterChange = (filters: FilterOptions) => {
    // Implement filter logic here
    console.log('Filters changed:', filters);
  };

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Transactions
          </h1>
          <p className="text-muted-foreground mt-2">
            Track and analyze your cryptocurrency transactions
          </p>
        </motion.div>

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
              <TransactionStats
                totalTransactions={mockStats.totalTransactions}
                totalVolume={mockStats.totalVolume}
                buyVolume={mockStats.buyVolume}
                sellVolume={mockStats.sellVolume}
                averageTransactionSize={mockStats.averageTransactionSize}
              />
            </motion.div>

            <motion.div
              whileHover={{ transform: 'translateZ(10px)' }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <TransactionTable transactions={transactions} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
