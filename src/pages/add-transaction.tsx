import AddCryptoForm from '@/components/AddCryptoForm';

import type { NextPage } from 'next';
import React from 'react';

const AddTransactionPage: NextPage = () => {
  return (
    <>
    <h2 > Add Transaction</h2>
      <div>
      <AddCryptoForm />
      </div>
    </>
  );
};

export default AddTransactionPage;
