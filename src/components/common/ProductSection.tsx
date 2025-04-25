'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick-theme.css';
import apiClient from '@/lib/api/client';
import Button from '../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  predictedPrice?: number;
  qualityScore?: number;
  imageUrls: string[];
  user: {
    firstName: string;
    lastName: string;
    averageRating?: number;
    county?: string;
  };
  category?: string; // Derived field (not in schema, added for filtering)
}

interface FilterState {
  category: string;
  county: string;
  minPrice: number | null;
  maxPrice: number | null;
}

const ProductCard: React.FC<Product> = ({
  id,
  name,
  price,
  predictedPrice,
  qualityScore,
  imageUrls,
  user,
  category,
 // quantity,
}) => {
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <img
          src={imageUrls[0] || '/images/placeholder.jpg'}
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy"
        />
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-delon text-dark">{name}</h3>
            <span className="bg-primary text-white text-xs font-hogira px-2 py-1 rounded">{category || 'Unknown'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-1 text-primary" />
            <span className="font-hogira">{user.county || 'Unknown Location'}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm font-hogira text-dark">
                KSH {price.toLocaleString()} {category === 'Fruits' || category === 'Vegetables' ? '' : '/ 90kg'}
              </p>
              {predictedPrice && (
                <p className="text-xs font-hogira text-gray-500">
                  AI Suggested: KSH {predictedPrice.toLocaleString()}
                </p>
              )}
            </div>
            {qualityScore && (
              <div className="text-sm font-hogira text-dark">
                Quality: {qualityScore}%
              </div>
            )}
          </div>
          <div className="flex items-center mb-3">
            <p className="text-sm font-hogira text-dark mr-2">
              {user.firstName} {user.lastName}
            </p>
            {user.averageRating && (
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={`w-4 h-4 ${i < Math.round(user.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-between gap-2">
            <Link href={`/messages?receiverId=${id}`}>
              <Button variant="outline" size="sm" className="w-full">
                Contact Seller
              </Button>
            </Link>
            <Link href={`/products/${id}`}>
              <Button variant="primary" size="sm" className="w-full">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    county: '',
    minPrice: null,
    maxPrice: null,
  });

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/products/featured');
        const fetchedProducts = response.data.map((product: Product) => ({
          ...product,
          category: inferCategory(product.name), // Derive category (temporary solution)
        }));
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : (typeof err === 'object' && err !== null && 'response' in err && 
             typeof err.response === 'object' && err.response !== null && 
             'data' in err.response && typeof err.response.data === 'object' && 
             err.response.data !== null && 'message' in err.response.data && 
             typeof err.response.data.message === 'string')
            ? err.response.data.message 
            : 'Failed to load products';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.county) {
      filtered = filtered.filter(
        (product) => product.user.county?.toLowerCase() === filters.county.toLowerCase()
      );
    }

    if (filters.minPrice !== null) {
      filtered = filtered.filter((product) => product.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== null) {
      filtered = filtered.filter((product) => product.price <= filters.maxPrice!);
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  // Helper to infer category (temporary, should be part of the database schema)
  const inferCategory = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('maize') || lowerName.includes('wheat')) return 'Cereals';
    if (lowerName.includes('tomato') || lowerName.includes('spinach')) return 'Vegetables';
    if (lowerName.includes('avocado') || lowerName.includes('mango')) return 'Fruits';
    if (lowerName.includes('beans') || lowerName.includes('peas')) return 'Legumes';
    if (lowerName.includes('potato') || lowerName.includes('yam')) return 'Tubers';
    return 'Unknown';
  };

  // Get unique categories and counties for filter options
  const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
  const counties = Array.from(new Set(products.map((p) => p.user.county))).filter(Boolean);

  // Handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === '' ? (name.includes('Price') ? null : '') : value,
    }));
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="font-leonetta text-dark">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="font-leonetta text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-delon text-dark text-center mb-4 animate-fade-in">
          Featured Products
        </h2>
        <p className="text-lg font-hogira text-gray-600 text-center mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
          Discover high-quality agricultural products from verified farmers.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div>
            <label className="block font-leonetta text-dark mb-1" id="category-label">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="p-2 border border-neutral rounded focus:ring-2 focus:ring-primary font-hogira"
              aria-labelledby="category-label"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-leonetta text-dark mb-1" id="county-label">Location</label>
            <select
              name="county"
              value={filters.county}
              onChange={handleFilterChange}
              className="p-2 border border-neutral rounded focus:ring-2 focus:ring-primary font-hogira"
              aria-labelledby="county-label"
            >
              <option value="">All Locations</option>
              {counties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-leonetta text-dark mb-1">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice || ''}
                onChange={handleFilterChange}
                placeholder="Min"
                className="w-24 p-2 border border-neutral rounded focus:ring-2 focus:ring-primary font-hogira"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice || ''}
                onChange={handleFilterChange}
                placeholder="Max"
                className="w-24 p-2 border border-neutral rounded focus:ring-2 focus:ring-primary font-hogira"
              />
            </div>
          </div>
        </div>

        {/* Product Carousel */}
        {filteredProducts.length > 0 ? (
          <Slider {...carouselSettings}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </Slider>
        ) : (
          <p className="text-center font-leonetta text-dark">
            No products match your filters.
          </p>
        )}

        {/* View All Products Button */}
        <div className="mt-8 text-center">
          <Link href="/marketplace">
            <Button variant="primary" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}