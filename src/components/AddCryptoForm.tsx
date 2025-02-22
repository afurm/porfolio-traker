import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { addTransaction } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { fadeIn } from '@/animations/framer';

export default function AddCryptoForm() {
  const [formData, setFormData] = useState({
    coinId: '',
    amount: '',
    price: '',
  });

  const mutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      setFormData({ coinId: '', amount: '', price: '' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      coinId: formData.coinId,
      amount: parseFloat(formData.amount),
      price: parseFloat(formData.price),
    });
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="mx-auto max-w-md"
    >
      <Card className="border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="PlusCircle" className="h-5 w-5 text-primary" />
            Add Transaction
          </CardTitle>
          <CardDescription>
            Record a new cryptocurrency transaction
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="coinId">
                Coin ID
              </label>
              <Input
                id="coinId"
                placeholder="Enter coin ID (e.g., bitcoin)"
                value={formData.coinId}
                onChange={(e) => setFormData({ ...formData, coinId: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="amount">
                Amount
              </label>
              <Input
                id="amount"
                type="number"
                step="any"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="price">
                Price (USD)
              </label>
              <Input
                id="price"
                type="number"
                step="any"
                placeholder="Enter price per coin"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Adding Transaction...
                </>
              ) : (
                <>
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Add Transaction
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
