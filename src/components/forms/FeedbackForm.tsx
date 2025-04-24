'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Lottie from 'lottie-react';
import successAnimation from '../../../public/lotties/sending-success-animation.json';
import errorAnimation from '../../../public/lotties/error-animation.json';
import apiClient from '@/lib/api/client';

interface FeedbackInputs {
  name?: string;
  rating: number;
  comment: string;
}

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackForm({ isOpen, onClose }: FeedbackFormProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);

  const { register, handleSubmit, reset } = useForm<FeedbackInputs>({
    defaultValues: {
      name: '',
      rating: 0,
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<FeedbackInputs> = async (data) => {
    try {
      setStatus('idle');
      await apiClient.post('/api/feedback', { ...data, rating });
      setStatus('success');
      reset();
      setRating(0);
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        {status === 'success' ? (
          <div className="flex flex-col items-center">
            <Lottie animationData={successAnimation} loop={false} className="w-32 h-32" />
            <p className="font-leonetta text-dark">Thank you for your feedback!</p>
          </div>
        ) : status === 'error' ? (
          <div className="flex flex-col items-center">
            <Lottie animationData={errorAnimation} loop={false} className="w-32 h-32" />
            <p className="font-leonetta text-red-500">{errorMessage}</p>
            <Button
              onClick={() => setStatus('idle')}
              className="mt-4"
              variant="primary"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-delon text-primary mb-4">Share Your Feedback</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-leonetta text-dark mb-1">Your Name (Optional)</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full p-2 border border-neutral rounded focus:ring-2 focus:ring-primary font-leonetta"
                />
              </div>
              <div>
                <label className="block font-leonetta text-dark mb-1">Rating</label>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i + 1)}
                      className="focus:outline-none"
                      aria-label={`Rate ${i + 1} stars`}
                    >
                      <svg
                        className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <input type="hidden" {...register('rating')} value={rating} />
              </div>
              <div>
                <label className="block font-leonetta text-dark mb-1">Your Feedback</label>
                <textarea
                  {...register('comment', { required: 'Feedback is required' })}
                  className="w-full p-2 border border-neutral rounded focus:ring-2 focus:ring-primary font-leonetta"
                  rows={4}
                  placeholder="Tell us about your experience..."
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button type="button" onClick={onClose} variant="outline">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={rating === 0}>
                  Submit Feedback
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}