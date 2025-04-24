'use client';
import { JSX } from 'react';
import { useInView } from 'react-intersection-observer';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: 'AI Price Insights',
    description: 'Get real-time price recommendations and demand trends using AI.',
    icon: (
      <svg
        className="w-12 h-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 8v8m-4-8v8m-4-8v8M4 4h16v16H4z"
        />
      </svg>
    ),
  },
  {
    title: 'Quality Assessment',
    description: 'AI-powered quality ratings to help buyers make informed decisions.',
    icon: (
      <svg
        className="w-12 h-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
  {
    title: 'Geolocation Matching',
    description: 'Connect with buyers and sellers in your vicinity for reduced logistics costs.',
    icon: (
      <svg
        className="w-12 h-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.243l-4.243-4.243m0 0l-4.243 4.243m4.243-4.243l4.243-4.243m-4.243 4.243L9.172 7.757M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Market Analytics',
    description: 'Access comprehensive market data to optimize your trading strategy.',
    icon: (
      <svg
        className="w-12 h-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    title: 'Direct Messaging',
    description: 'Communicate directly with trading partners without intermediaries.',
    icon: (
      <svg
        className="w-12 h-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    title: 'Transaction History',
    description: 'Track all your trades and build a trusted reputation on the platform.',
    icon: (
      <svg
        className="w-12 h-12 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
];

const FeatureCard: React.FC<Feature & { index: number }> = ({ title, description, icon, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-delon text-dark text-center mb-2">{title}</h3>
      <p className="text-sm font-hogira text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default function FeaturesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-delon text-dark mb-4 animate-fade-in">
          Revolutionizing Agricultural Trade
        </h2>
        <p className="text-lg font-hogira text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in animation-delay-200">
          Our AI-powered platform provides tools and insights to help farmers maximize profits and buyers source quality produce efficiently.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} index={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}