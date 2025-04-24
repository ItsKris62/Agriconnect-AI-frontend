'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';

type SearchInputs = {
  query: string;
};

export default function SearchForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<SearchInputs>({
    defaultValues: { query: '' },
  });

  const onSubmit: SubmitHandler<SearchInputs> = async (data) => {
    setIsLoading(true);
    try {
      router.push(`/marketplace?search=${encodeURIComponent(data.query)}`);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2 max-w-lg mx-auto">
      <input
        type="text"
        {...register('query')}
        placeholder="Search for products..."
        className="w-full p-2 border border-neutral rounded focus:ring-2 focus:ring-primary font-leonetta"
      />
      <Button type="submit" isLoading={isLoading}>
        Search
      </Button>
    </form>
  );
}