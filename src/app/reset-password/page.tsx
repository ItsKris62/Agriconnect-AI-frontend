'use client';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Lottie from 'lottie-react';
import successAnimation from '../../../public/lotties/success-animation.json';
import errorAnimation from '../../../public/lotties/error-animation.json';
import axios from 'axios';

const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type ResetInputs = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetInputs>({
    resolver: zodResolver(resetSchema),
  });

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      setErrorMessage('Invalid or missing token.');
    }
  }, [token]);

  const onSubmit: SubmitHandler<ResetInputs> = async (data) => {
    try {
      setStatus('idle');
      await axios.post('/api/auth/reset-password', {
        token,
        newPassword: data.password,
      });
      setStatus('success');
      setTimeout(() => window.location.href = '/', 3000);
    } catch (error: unknown) {
      setStatus('error');
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'An error occurred');
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-105">
        {status === 'success' ? (
          <div className="flex flex-col items-center">
            <Lottie animationData={successAnimation} loop={false} className="w-32 h-32" />
            <p className="font-leonetta text-dark">Password reset successful! Redirecting...</p>
          </div>
        ) : status === 'error' ? (
          <div className="flex flex-col items-center">
            <Lottie animationData={errorAnimation} loop={false} className="w-32 h-32" />
            <p className="font-leonetta text-red-500">{errorMessage}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 bg-primary text-white font-ltsiptext py-2 px-4 rounded hover:bg-accent"
            >
              Try Again
            </button>
          </div>
        ) : status === 'invalid' ? (
          <div className="flex flex-col items-center">
            <Lottie animationData={errorAnimation} loop={false} className="w-32 h-32" />
            <p className="font-leonetta text-red-500">{errorMessage}</p>
            <a
              href="/"
              className="mt-4 bg-primary text-white font-ltsiptext py-2 px-4 rounded hover:bg-accent"
            >
              Go to Home
            </a>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-delon text-primary mb-4">Set New Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="password" className="block font-leonetta text-dark">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="w-full p-2 border border-neutral rounded focus:ring-2 focus:ring-primary"
                />
                {errors.password && <p className="text-red-500 text-sm font-leonetta">{errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block font-leonetta text-dark">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  className="w-full p-2 border border-neutral rounded focus:ring-2 focus:ring-primary"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm font-leonetta">{errors.confirmPassword.message}</p>}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-white font-ltsiptext py-2 px-4 rounded hover:bg-primary disabled:opacity-50"
                >
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}