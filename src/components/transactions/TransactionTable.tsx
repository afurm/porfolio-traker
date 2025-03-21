import React from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Icon } from '@/components/ui/icon';
import { formatCurrency } from '@/utils/formatCurrency';
import { staggerContainer, listItem } from '@/animations/framer';

interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  asset: string;
  amount: number;
  price: number;
  total: number;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="relative overflow-hidden rounded-xl backdrop-blur-md bg-card/50 border border-border shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />

      <div className="relative p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b-border">
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-muted-foreground">Asset</TableHead>
              <TableHead className="text-right text-muted-foreground">Amount</TableHead>
              <TableHead className="text-right text-muted-foreground">Price</TableHead>
              <TableHead className="text-right text-muted-foreground">Total</TableHead>
              <TableHead className="text-right text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <motion.tr
                key={transaction.id}
                variants={listItem}
                className="border-b border-border/50 transition-colors hover:bg-accent/50"
              >
                <TableCell className="text-sm text-foreground/80">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`flex items-center gap-1 ${
                      transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    <Icon
                      name={transaction.type === 'buy' ? 'ArrowDownRight' : 'ArrowUpRight'}
                      className="h-4 w-4"
                    />
                    {transaction.type.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-foreground/80">{transaction.asset}</TableCell>
                <TableCell className="text-right text-sm text-foreground/80">
                  {transaction.amount.toFixed(8)}
                </TableCell>
                <TableCell className="text-right text-sm text-foreground/80">
                  {formatCurrency(transaction.price)}
                </TableCell>
                <TableCell className="text-right text-sm text-foreground/80">
                  {formatCurrency(transaction.total)}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      transaction.status === 'completed'
                        ? 'bg-green-500/10 text-green-400'
                        : transaction.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </motion.div>
  );
}
