'use client';
import { useAuthStore } from '@/lib/zustand/authStore';
import Button from '../common/Button';
import Link from 'next/link';

export default function CTASection() {
  const { isAuthenticated, toggleSignup } = useAuthStore();

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-accent text-white text-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 400"
        >
          <path
            d="M0 200c200-100 400 100 600 0s400-100 600 0v200H0z"
            fill="url(#gradient)"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1200" y2="400">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-delon mb-4 animate-fade-in">
          {isAuthenticated ? 'List Your Products Today' : 'Join Soko Yetu AI Now'}
        </h2>
        <p className="text-lg font-hogira mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
          {isAuthenticated
            ? 'Reach buyers across East Africa and get AI-driven insights to maximize your profits.'
            : 'Connect with farmers, access fresh produce, and leverage AI insights to grow your business.'}
        </p>
        {isAuthenticated ? (
          <Link href="/products/create">
            <Button
              variant="secondary"
              size="lg"
              className="transform hover:scale-105 transition-transform duration-300 animate-fade-in animation-delay-400"
            >
              List a Product
            </Button>
          </Link>
        ) : (
          <Button
            variant="secondary"
            size="lg"
            onClick={toggleSignup}
            className="transform hover:scale-105 transition-transform duration-300 animate-fade-in animation-delay-400"
          >
            Sign Up Now
          </Button>
        )}
      </div>
    </section>
  );
}