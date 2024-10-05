import type { NextPage } from 'next';
import AddCryptoForm from '@/components/AddCryptoForm';

const Dashboard: NextPage = () => {
  
  return (
    <>
    <h2 >Your Dashboard</h2>
      <div>
          <AddCryptoForm  />
      </div>
    </>
  );
};

export default Dashboard;
