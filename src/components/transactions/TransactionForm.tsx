import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from '@/graphql/transactions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface Transaction {
  id?: string;
  date: string;
  transactionType: string;
  asset: string;
  amount: number;
  price: number;
  status: string;
}

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  transaction?: Transaction;
}

export function TransactionForm({ isOpen, onClose, onSuccess, transaction }: TransactionFormProps) {
  const isEditing = !!transaction?.id;

  const [formData, setFormData] = useState<Transaction>({
    date: new Date().toISOString().split('T')[0],
    transactionType: 'buy',
    asset: '',
    amount: 0,
    price: 0,
    status: 'completed',
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        id: transaction.id,
        date: new Date(transaction.date).toISOString().split('T')[0],
        transactionType: transaction.transactionType,
        asset: transaction.asset,
        amount: transaction.amount,
        price: transaction.price,
        status: transaction.status,
      });
    }
  }, [transaction]);

  const [createTransaction, { loading: createLoading }] = useMutation(CREATE_TRANSACTION, {
    onCompleted: (data) => {
      if (data.createTransaction.errors.length === 0) {
        toast({
          title: 'Success',
          description: 'Transaction created successfully',
          variant: 'default',
        });
        onSuccess();
        onClose();
      } else {
        toast({
          title: 'Error',
          description: data.createTransaction.errors.join(', '),
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

  const [updateTransaction, { loading: updateLoading }] = useMutation(UPDATE_TRANSACTION, {
    onCompleted: (data) => {
      if (data.updateTransaction.errors.length === 0) {
        toast({
          title: 'Success',
          description: 'Transaction updated successfully',
          variant: 'default',
        });
        onSuccess();
        onClose();
      } else {
        toast({
          title: 'Error',
          description: data.updateTransaction.errors.join(', '),
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const variables = {
      date: new Date(formData.date).toISOString(),
      transactionType: formData.transactionType,
      asset: formData.asset,
      amount: formData.amount,
      price: formData.price,
      status: formData.status,
    };

    if (isEditing && formData.id) {
      updateTransaction({
        variables: {
          id: formData.id,
          ...variables,
        },
      });
    } else {
      createTransaction({
        variables,
      });
    }
  };

  const isLoading = createLoading || updateLoading;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionType">Type</Label>
              <Select
                value={formData.transactionType}
                onValueChange={(value) => handleSelectChange('transactionType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="asset">Asset</Label>
            <Input
              id="asset"
              name="asset"
              placeholder="BTC, ETH, etc."
              value={formData.asset}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.00000001"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : isEditing ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
