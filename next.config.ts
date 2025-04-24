import type { NextConfig } from 'next';
// Use ES Module import for next-pwa
import withPWAInit from 'next-pwa';

// Import the type from next-pwa for proper type assertion
import type { NextConfig as PWANextConfig } from 'next-pwa';

// Determine if PWA should be disabled (typically in development)
const isDev = process.env.NODE_ENV === 'development';

// Initialize the PWA plugin using the imported function
const withPWA = withPWAInit({
  dest: 'public',       // Destination directory for PWA files
  register: true,       // Register the service worker
  skipWaiting: true,    // Skip the waiting phase and activate the new service worker immediately
  disable: isDev,       // Disable PWA features in development mode
  // buildExcludes: [/middleware-manifest.json$/], // Example: If you encounter build issues, you might need to exclude certain files
  // cacheOnFrontEndNav: true, // Optional: Caches pages navigated to client-side
  // aggressiveFrontEndNavCaching: true, // Optional: More aggressive caching
});

// Your base Next.js configuration
const nextConfig: NextConfig = {
  reactStrictMode: true, // Recommended for identifying potential problems
  images: {
    // Using remotePatterns is the recommended approach for Next.js 13+
    // It offers more control than 'domains'.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        // You can be more specific with the pathname if needed, e.g., '/your-cloudinary-folder/**'
        pathname: '/**',
      },
      // Add other patterns here if needed
    ],
    // 'domains' is still supported but less flexible. Keep it if remotePatterns cause issues
    // or if you are on an older Next.js version that doesn't support remotePatterns well.
    // domains: ['res.cloudinary.com'],
  },
  // Add any other Next.js configuration options here
  // For example:
  // experimental: {
  //   appDir: true, // If using the App Router
  // },
};

// Wrap your Next.js config with the PWA configuration
// Use a type assertion that preserves type safety but resolves the incompatibility
export default withPWA(nextConfig as unknown as Parameters<typeof withPWA>[0]);

