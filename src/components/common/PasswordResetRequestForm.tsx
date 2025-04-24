'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore } from '@/lib/zustand/authStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Lottie from 'lottie-react';
import successAnimation from '../../../public/lotties/success-animation.json';
import errorAnimation from '../../../public/lotties/error-animation.json';
import axios from 'axios';

const requestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type RequestInputs = z.infer<typeof requestSchema>;

export default function PasswordResetRequestForm() {
  const { togglePasswordReset } = useAuthStore();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestInputs>({
    resolver: zodResolver(requestSchema),
  });

  const onSubmit: SubmitHandler<RequestInputs> = async (data) => {
    try {
      setStatus('idle');
      await axios.post('/api/auth/request-password-reset', { email: data.email });
      setStatus('success');
      setTimeout(() => togglePasswordReset(), 3000);
    } catch (error: unknown) {
      setStatus('error');
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-dark bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-105">
        {status === 'success' ? (
          <div className="flex flex-col items-center">
            <Lottie animationData={successAnimation} loop={false} className="w-32 h-32" />
            <p className="font-leonetta text-dark text-center">
              Password reset link sent! Check your email.
            </p>
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
        ) : (
          <>
            <h2 className="text-2xl font-delon text-primary mb-4">Reset Password</h2>
            <p className="font-leonetta text-dark mb-4">
              Enter your email to receive a password reset link.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-leonetta text-dark">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full p-2 border border-neutral rounded focus:ring-2 focus:ring-primary"
                />
                {errors.email && <p className="text-red-500 text-sm font-leonetta">{errors.email.message}</p>}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={togglePasswordReset}
                  className="bg-neutral text-dark font-ltsiptext py-2 px-4 rounded hover:bg-dark hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-white font-ltsiptext py-2 px-4 rounded hover:bg-primary disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}