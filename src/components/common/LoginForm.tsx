'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore } from '@/lib/zustand/authStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Lottie from 'lottie-react';
import successAnimation from '../../../public/lotties/success-animation.json';
import errorAnimation from '../../../public/lotties/error-animation.json';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { toggleLogin, togglePasswordReset, login } = useAuthStore();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      setStatus('idle');
      await login(data.email, data.password);
      setStatus('success');
      setTimeout(() => toggleLogin(), 2000); // Close modal after animation
    } catch (error: unknown) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-dark bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-105">
        {status === 'success' ? (
          <div className="flex flex-col items-center">
            <Lottie animationData={successAnimation} loop={false} className="w-32 h-32" />
            <p className="font-leonetta text-dark">Login Successful!</p>
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
            <h2 className="text-2xl font-delon text-primary mb-4">Login</h2>
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
              <div>
                <label htmlFor="password" className="block font-leonetta text-dark">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="w-full p-2 border border-neutral rounded focus:ring-2 focus:ring-primary"
                />
                {errors.password && <p className="text-red-500 text-sm font-leonetta">{errors.password.message}</p>}
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={togglePasswordReset}
                  className="text-primary font-ltsiptext hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleLogin}
                  className="bg-neutral text-dark font-ltsiptext py-2 px-4 rounded hover:bg-dark hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-white font-ltsiptext py-2 px-4 rounded hover:bg-primary disabled:opacity-50"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}