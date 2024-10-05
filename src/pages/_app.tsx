import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;