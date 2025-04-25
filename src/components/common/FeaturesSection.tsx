'use client';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faStar,
  faMapMarkerAlt,
  faChartBar,
  faComments,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import { JSX } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: 'AI Price Insights',
    description: 'Get real-time price recommendations and demand trends using AI.',
    icon: <FontAwesomeIcon icon={faChartLine} className="w-12 h-12 text-primary" />,
  },
  {
    title: 'Quality Assessment',
    description: 'AI-powered quality ratings to help buyers make informed decisions.',
    icon: <FontAwesomeIcon icon={faStar} className="w-12 h-12 text-primary" />,
  },
  {
    title: 'Geolocation Matching',
    description: 'Connect with buyers and sellers in your vicinity for reduced logistics costs.',
    icon: <FontAwesomeIcon icon={faMapMarkerAlt} className="w-12 h-12 text-primary" />,
  },
  {
    title: 'Market Analytics',
    description: 'Access comprehensive market data to optimize your trading strategy.',
    icon: <FontAwesomeIcon icon={faChartBar} className="w-12 h-12 text-primary" />,
  },
  {
    title: 'Direct Messaging',
    description: 'Communicate directly with trading partners without intermediaries.',
    icon: <FontAwesomeIcon icon={faComments} className="w-12 h-12 text-primary" />,
  },
  {
    title: 'Transaction History',
    description: 'Track all your trades and build a trusted reputation on the platform.',
    icon: <FontAwesomeIcon icon={faHistory} className="w-12 h-12 text-primary" />,
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
      className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-lg ${
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