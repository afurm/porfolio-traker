import React, { useState } from 'react';
import Image from 'next/image';
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
import { formatCurrency } from '@/utils/formatCurrency';
import { fadeIn } from '@/animations/framer';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  large: string;
  market_cap_rank: number;
  price_btc: number;
}

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAssetModal({ isOpen, onClose }: AddAssetModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [amount, setAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrypto || !amount || !purchasePrice) return;

    onClose();
    setSearchQuery('');
    setSelectedCrypto(null);
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {selectedCrypto && (
                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  className="rounded-lg border p-4"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Image
                      src={selectedCrypto.thumb}
                      alt={selectedCrypto.name}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                    <span className="font-medium">{selectedCrypto.name}</span>
                    <span className="text-muted-foreground">
                      ({selectedCrypto.symbol.toUpperCase()})
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
              <Button type="submit" disabled={!selectedCrypto || !amount || !purchasePrice}>
                Add Asset
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
}
