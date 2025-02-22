import type { AppProps } from 'next/app';
import React from 'react';

import { QueryProvider } from '@/lib/providers/QueryProvider';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default MyApp;