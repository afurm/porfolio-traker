import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SignInForm from '@/components/auth/SignInForm';

export default function SignIn() {
  const { status } = useSession();
  const router = useRouter();
  const { callbackUrl } = router.query;

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl ? String(callbackUrl) : '/dashboard');
    }
  }, [status, router, callbackUrl]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Sign In - FolioFlux</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <SignInForm />
      </div>
    </>
  );
}
