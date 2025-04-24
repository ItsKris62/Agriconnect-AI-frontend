'use client';
import Link from 'next/link';
import CountUp from 'react-countup';

export default function Hero() {
  return (
    <section className="relative h-[70vh] text-white">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/veriwoks-sokoyetu/video/upload/v1744231895/18278705-uhd_3840_2160_24fps_wips72.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-dark bg-opacity-50"></div>
      {/* Content */}
      <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-hogira mb-4">
          Empowering Kenyan Farmers with AI-Driven Insights
        </h1>
        <p className="text-lg font-delon mb-8 max-w-2xl">
          Connect directly with buyers, get fair prices, and make data-driven decisions with our innovative agricultural marketplace.
        </p>
        <Link
          href="/products/create"
          className="bg-white text-dark font-ltsiptext py-3 px-6 rounded hover:bg-accent hover:text-white"
        >
          List Your Product
        </Link>
        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg">
            <h3 className="text-3xl font-ltsiptext">
              <CountUp end={5280} duration={2} separator="," suffix="+" />
            </h3>
            <p className="font-delon">Active Farmers</p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg">
            <h3 className="text-3xl font-ltsiptext">
              <CountUp end={12450} duration={2} separator="," suffix="+" />
            </h3>
            <p className="font-delon">Products Listed</p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg">
            <h3 className="text-3xl font-ltsiptext">
              <CountUp end={8740} duration={2} separator="," suffix="+" />
            </h3>
            <p className="font-delon">Successful Trades</p>
          </div>
        </div>
      </div>
    </section>
  );
}