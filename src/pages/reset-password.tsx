import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { userApi } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResetPassword() {
    const router = useRouter();
    const { email, code } = router.query;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(0);
    const [formData, setFormData] = useState({
        code: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (code) {
            setFormData(prev => ({ ...prev, code: code as string }));
        }
    }, [code]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleResendCode = async () => {
        if (countdown > 0 || !email) return;

        setIsLoading(true);
        setError(null);

        try {
            await userApi.requestPasswordReset(email as string);
            setSuccess('Reset code sent to your email');
            setCountdown(60); // 60 seconds cooldown
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to send reset code');
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
            // Validate passwords
            if (formData.password !== formData.password_confirmation) {
                throw new Error('Passwords do not match');
            }

            if (formData.password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            const response = await userApi.resetPassword(
                email as string,
                formData.code,
                formData.password,
                formData.password_confirmation
            );

            // Sign in the user with the token
            if (response.token) {
                setSuccess('Password reset successfully. Signing you in...');

                // Use the token to sign in
                const result = await signIn('credentials', {
                    redirect: false,
                    email: email as string,
                    password: formData.password,
                });

                if (result?.error) {
                    throw new Error(result.error);
                }

                // Redirect to dashboard
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1500);
            } else {
                setSuccess('Password reset successfully. You can now sign in.');
                setTimeout(() => {
                    router.push('/signin');
                }, 1500);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Password reset failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (!email) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Invalid Request</h1>
                    <p className="mb-4">No email address provided for password reset.</p>
                    <a
                        href="/forgot-password"
                        className="text-primary underline-offset-4 hover:underline"
                    >
                        Go to forgot password
                    </a>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Reset Password - Crypto Portfolio Tracker</title>
            </Head>
            <div className="flex min-h-screen items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
                        <CardDescription>
                            Enter the code sent to {email} and your new password
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="rounded-md bg-green-50 p-3 text-sm text-green-500">
                                    {success}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label htmlFor="code" className="text-sm font-medium">
                                    Reset Code
                                </label>
                                <Input
                                    id="code"
                                    name="code"
                                    placeholder="Enter 6-digit code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    required
                                    maxLength={6}
                                    pattern="[0-9]{6}"
                                    inputMode="numeric"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium">
                                    New Password
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password_confirmation" className="text-sm font-medium">
                                    Confirm New Password
                                </label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading || formData.code.length !== 6}
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={handleResendCode}
                                disabled={isLoading || countdown > 0}
                            >
                                {countdown > 0
                                    ? `Resend code in ${countdown}s`
                                    : 'Resend reset code'}
                            </Button>
                            <div className="text-sm text-center text-muted-foreground">
                                <a
                                    href="/signin"
                                    className="text-primary underline-offset-4 hover:underline"
                                >
                                    Back to sign in
                                </a>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
} 