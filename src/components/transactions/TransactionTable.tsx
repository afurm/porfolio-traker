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
import { Button } from '@/components/ui/button';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_TRANSACTIONS, DELETE_TRANSACTION } from '@/graphql/transactions';
import { toast } from '@/components/ui/use-toast';

interface Transaction {
  id: string;
  date: string;
  transactionType: 'buy' | 'sell';
  asset: string;
  amount: number;
  price: number;
  totalValue: number;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionTableProps {
  filters: {
    startDate?: string;
    endDate?: string;
    transactionType?: string;
    asset?: string;
  };
  onEdit: (transaction: Transaction) => void;
}

export function TransactionTable({ filters, onEdit }: TransactionTableProps) {
  const { loading, error, data, refetch } = useQuery(GET_USER_TRANSACTIONS, {
    variables: filters,
    fetchPolicy: 'network-only',
  });

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: (data) => {
      if (data.deleteTransaction.success) {
        toast({
          title: 'Transaction deleted',
          description: 'The transaction has been successfully deleted.',
          variant: 'default',
        });
        refetch();
      } else {
        toast({
          title: 'Error',
          description: data.deleteTransaction.errors.join(', '),
          variant: 'destructive',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction({
        variables: { id },
      });
    }
  };

  if (loading) return <div className="p-8 text-center">Loading transactions...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error.message}</div>;

  const transactions = data?.userTransactions || [];

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
        {transactions.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <Icon name="FileX" className="mx-auto h-12 w-12 opacity-20" />
            <h3 className="mt-4 text-lg font-medium">No transactions found</h3>
            <p className="mt-1">Try adjusting your filters or add a new transaction.</p>
          </div>
        ) : (
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
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction: Transaction) => (
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
                        transaction.transactionType === 'buy' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      <Icon
                        name={
                          transaction.transactionType === 'buy' ? 'ArrowDownRight' : 'ArrowUpRight'
                        }
                        className="h-4 w-4"
                      />
                      {transaction.transactionType.toUpperCase()}
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
                    {formatCurrency(transaction.totalValue)}
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
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(transaction)}
                        className="h-8 w-8"
                      >
                        <Icon name="Edit" className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(transaction.id)}
                        className="h-8 w-8 text-red-400 hover:text-red-500"
                      >
                        <Icon name="Trash2" className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </motion.div>
  );
}
