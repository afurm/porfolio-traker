import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
  Input,
} from '@/components/ui';
import { Icon } from '@/components/ui/icon';
import { useSearchCrypto } from '@/lib/queries/useQueries';
import { useStore } from '@/lib/store/useStore';
import { formatCurrency } from '@/utils/formatCurrency';
import { fadeIn } from '@/animations/framer';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAssetModal({ isOpen, onClose }: AddAssetModalProps) {
  const [search, setSearch] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const addAsset = useStore((state) => state.addAsset);

  const { data: searchResults, isLoading } = useSearchCrypto(search);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCoin || !amount || !purchasePrice) return;

    const newAsset = {
      id: selectedCoin.id,
      coinName: selectedCoin.name,
      symbol: selectedCoin.symbol.toUpperCase(),
      amount: parseFloat(amount),
      purchasePrice: parseFloat(purchasePrice),
      currentPrice: parseFloat(purchasePrice), // Will be updated by real-time data
      lastUpdated: new Date().toISOString(),
    };

    addAsset(newAsset);
    onClose();
    setSearch('');
    setSelectedCoin(null);
    setAmount('');
    setPurchasePrice('');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="w-full max-w-md p-4"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Add New Asset</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full"
              >
                <Icon name="X" size="sm" />
              </Button>
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Cryptocurrency</label>
                <Input
                  type="text"
                  placeholder="Search by name or symbol..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && searchResults && (
                  <motion.div
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    className="mt-2 max-h-48 overflow-auto rounded-md border bg-background p-1"
                  >
                    {searchResults.map((coin: any) => (
                      <Button
                        key={coin.id}
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        onClick={() => {
                          setSelectedCoin(coin);
                          setSearch('');
                        }}
                      >
                        <img src={coin.thumb} alt={coin.name} className="h-5 w-5" />
                        <span>{coin.name}</span>
                        <span className="text-muted-foreground">({coin.symbol.toUpperCase()})</span>
                      </Button>
                    ))}
                  </motion.div>
                )}
              </div>

              {selectedCoin && (
                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  className="rounded-lg border p-4"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <img src={selectedCoin.thumb} alt={selectedCoin.name} className="h-6 w-6" />
                    <span className="font-medium">{selectedCoin.name}</span>
                    <span className="text-muted-foreground">
                      ({selectedCoin.symbol.toUpperCase()})
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Amount</label>
                      <Input
                        type="number"
                        placeholder="Enter amount..."
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        step="any"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Purchase Price (USD)</label>
                      <Input
                        type="number"
                        placeholder="Enter purchase price..."
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        min="0"
                        step="any"
                      />
                    </div>
                    {amount && purchasePrice && (
                      <div className="rounded-md bg-muted p-2 text-sm">
                        Total Value:{' '}
                        {formatCurrency(parseFloat(amount) * parseFloat(purchasePrice))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!selectedCoin || !amount || !purchasePrice}>
                Add Asset
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
}
