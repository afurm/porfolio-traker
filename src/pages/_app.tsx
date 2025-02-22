import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';

import { QueryProvider } from '@/lib/providers/QueryProvider';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <Head>
        <title>Crypto Portfolio Tracker</title>
        <meta
          name="description"
          content="Track and manage your crypto investments with AI-powered insights"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default MyApp;
