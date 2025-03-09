import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

import { QueryProvider } from '@/lib/providers/QueryProvider';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <Head>
          <title>FolioFlux</title>
          <meta
            name="description"
            content="Track and manage your crypto investments with AI-powered insights"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </QueryProvider>
    </SessionProvider>
  );
}

export default MyApp;
