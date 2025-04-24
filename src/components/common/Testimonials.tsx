'use client';
import { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Jane M.',
    role: 'Farmer',
    quote: 'Soko Yetu AI helped me sell my maize directly to buyers at better prices!',
    avatar: '/images/avatars/jane.jpg',
    rating: 5,
  },
  {
    name: 'Peter K.',
    role: 'Buyer',
    quote: 'Finding fresh produce from local farmers has never been easier.',
    avatar: '/images/avatars/peter.jpg',
    rating: 4,
  },
  {
    name: 'Mary W.',
    role: 'Farmer',
    quote: 'The AI insights improved my crop quality and market decisions.',
    avatar: '/images/avatars/mary.jpg',
    rating: 5,
  },
];

const TestimonialCard: React.FC<Testimonial> = ({ name, role, quote, avatar, rating }) => {
  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-500">
        <div className="flex items-center mb-4">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div>
            <h3 className="text-lg font-delon text-dark">{name}</h3>
            <p className="text-sm font-hogira text-gray-500">{role}</p>
          </div>
        </div>
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={`${rating} out of 5 stars`}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="font-leonetta text-dark italic">"{quote}"</p>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-neutral">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-delon text-primary mb-4 animate-fade-in">
          What Our Users Say
        </h2>
        <p className="text-lg font-hogira text-dark mb-12 max-w-2xl mx-auto animate-fade-in animation-delay-200">
          Hear from farmers and buyers who have transformed their agricultural trade with Soko Yetu AI.
        </p>
        <div className="px-4">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}