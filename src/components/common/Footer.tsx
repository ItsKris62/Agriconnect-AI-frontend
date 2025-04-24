'use client';
import { useAuthStore } from '@/lib/zustand/authStore';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/Button';
import FeedbackForm from '../forms/FeedbackForm';

export default function Footer() {
    const { isLoginOpen, isSignupOpen, isFeedbackOpen, toggleFeedback } = useAuthStore(); // Use auth state to check if user is logged in

  return (
    <footer className="bg-dark text-white py-12 font-leonetta">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Brand */}
        <div>
          <div className="text-2xl font-hogira text-primary flex items-center mb-2">
            <Image
              src="https://res.cloudinary.com/veriwoks-sokoyetu/image/upload/v1741705403/Home-images/sguubafg5gk2sbdtqd60.png"
              alt="Soko Yetu AI Logo"
              width={32}
              height={32}
              className="object-contain mr-2"
            />
            Soko Yetu AI
          </div>
          <p className="text-neutral mb-4">
            Connecting Kenyan farmers and buyers with AI-powered insights.
          </p>
          <div className="flex gap-4 text-neutral">
            <a href="https://facebook.com" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} />
              <span>+254 700 000000</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>info@sokoyetu.ai</span>
            </div>
          </div>
        </div>

        {/* Marketplace Links */}
        <div>
          <h4 className="font-montserrat text-lg mb-2">Marketplace</h4>
          <ul className="space-y-1 text-neutral">
            <li>
              <Link href="/marketplace" className="hover:text-secondary">
                Browse Products
              </Link>
            </li>
            <li>
              <Link href="/products/create" className="hover:text-secondary">
                Sell Products
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className="hover:text-secondary">
                Featured Listings
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-montserrat text-lg mb-2">Resources</h4>
          <ul className="space-y-1 text-neutral">
            <li>
              <Link href="/resources" className="hover:text-secondary">
                Market Trends
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-secondary">
                Seller Guide
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-secondary">
                Buyer Guide
              </Link>
            </li>
            {(isLoginOpen || isSignupOpen) && (
              <li>
                <Link href="/community" className="hover:text-secondary">
                  Success Stories
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-navara text-lg mb-2">Company</h4>
          <ul className="space-y-1 text-neutral">
            <li>
              <Link href="/about" className="hover:text-secondary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-secondary">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-secondary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-secondary">
                Terms of Service
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <h5 className="font-navara mb-1">Secure Payments</h5>
            <div className="flex gap-2 text-neutral text-lg">
              <FontAwesomeIcon icon={faCreditCard} />
              <FontAwesomeIcon icon={faCreditCard} />
              <FontAwesomeIcon icon={faCreditCard} />
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={toggleFeedback} variant="outline" size="sm">
              Give Feedback
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-10 border-t border-neutral pt-4 text-center text-xs text-neutral">
        <div className="mb-2">© 2025 Soko Yetu AI. All rights reserved.</div>
      </div>
      {/* Feedback Modal */}
      {isFeedbackOpen && <FeedbackForm isOpen={isFeedbackOpen} onClose={toggleFeedback} />}
    </footer>
  );
}