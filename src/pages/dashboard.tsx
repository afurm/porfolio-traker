import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import ProtectedPage from '@/components/ProtectedPage';
import AddCryptoForm from '@/components/AddCryptoForm';

const Dashboard: NextPage = () => {
  const { data: session } = useSession();

  return (
    <ProtectedPage>
      <Head>
        <title>Dashboard - Crypto Portfolio Tracker</title>
      </Head>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Dashboard content will go here */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-medium">Welcome, {session?.user?.name}</h3>
            <p className="text-sm text-muted-foreground">
              You are signed in with {session?.user?.provider}
            </p>
          </div>
        </div>

        <div>
          <AddCryptoForm />
        </div>
      </div>
    </ProtectedPage>
  );
};

export default Dashboard;
