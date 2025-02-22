import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/formatCurrency';
import { Icon } from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { mockTransactions } from '@/lib/mock/data';
import { cn } from '@/lib/utils';

const TransactionList = () => {
  return (
    <div className="space-y-4">
      {mockTransactions.map((transaction, index) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-4 p-4">
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full',
                  transaction.type === 'buy'
                    ? 'bg-accent-green/10 text-accent-green'
                    : 'bg-accent-red/10 text-accent-red'
                )}
              >
                <Icon
                  name={transaction.type === 'buy' ? 'ArrowDownRight' : 'ArrowUpRight'}
                  className="h-6 w-6"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{transaction.coinName}</h3>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      transaction.type === 'buy' ? 'text-accent-green' : 'text-accent-red'
                    )}
                  >
                    {transaction.type === 'buy' ? '+' : '-'}
                    {transaction.amount}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{new Date(transaction.timestamp).toLocaleDateString()}</span>
                  <span>{formatCurrency(transaction.price)}</span>
                </div>
              </div>

              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent/50">
                <button
                  className="text-muted-foreground hover:text-accent-foreground"
                  title="View Details"
                >
                  <Icon name="MoreVertical" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TransactionList;
