import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import VerifyEmailForm from '@/components/auth/VerifyEmailForm';

export default function VerifyEmail() {
  const { status } = useSession();
  const router = useRouter();
  const { email } = router.query;

  useEffect(() => {
    if (status === 'authenticated' && !email) {
      router.push('/dashboard');
    }
  }, [status, router, email]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Request</h1>
          <p className="mb-4">No email address provided for verification.</p>
          <Link href="/signin" className="text-primary underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Verify Email - Crypto Portfolio Tracker</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <VerifyEmailForm />
      </div>
    </>
  );
}
