import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { userApi } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message?: string;
}

export default function VerifyEmailForm() {
  const router = useRouter();
  const { email } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendCode = async () => {
    if (countdown > 0 || !email) return;

    setIsLoading(true);
    setError(null);

    try {
      await userApi.requestVerificationCode(email as string);
      setSuccess('Verification code sent to your email');
      setCountdown(60); // 60 seconds cooldown
    } catch (error: unknown) {
      const apiError = error as ApiError;
      setError(apiError.response?.data?.error || 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await userApi.verifyEmail(email as string, code);

      // Sign in the user with the token
      if (response.token) {
        setSuccess('Email verified successfully. Signing you in...');

        // Use the token to sign in
        const result = await signIn('credentials', {
          redirect: false,
          email: email as string,
          token: response.token,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setSuccess('Email verified successfully. You can now sign in.');
        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      setError(
        apiError.response?.data?.error ||
          (error instanceof Error ? error.message : 'Verification failed')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
        <CardDescription>
          Enter the verification code sent to {email || 'your email'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{error}</div>}
          {success && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-500">{success}</div>
          )}
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium">
              Verification Code
            </label>
            <Input
              id="code"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={6}
              pattern="[0-9]{6}"
              inputMode="numeric"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleResendCode}
            disabled={isLoading || countdown > 0}
          >
            {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend verification code'}
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            <Link href="/signin" className="text-primary underline-offset-4 hover:underline">
              Back to sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
