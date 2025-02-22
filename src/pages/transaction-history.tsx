import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/icon';
import TransactionList from '@/components/TransactionList';
import { Button } from '@/components/ui/button';
import { fadeIn } from '@/animations/framer';

export default function TransactionHistory() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-sm text-muted-foreground">
            Track all your cryptocurrency transactions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="Filter" className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="Download" className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border/50 bg-background/95 backdrop-blur p-6 supports-[backdrop-filter]:bg-background/60">
        <TransactionList />
      </div>
    </motion.div>
  );
}
