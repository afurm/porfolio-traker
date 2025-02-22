import React from 'react';
import { motion } from 'framer-motion';
import AddCryptoForm from '@/components/AddCryptoForm';
import { fadeIn } from '@/animations/framer';

export default function AddTransaction() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold">Add Transaction</h1>
        <p className="text-sm text-muted-foreground">
          Record your cryptocurrency purchases and sales
        </p>
      </div>

      <AddCryptoForm />
    </motion.div>
  );
}
