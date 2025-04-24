'use client';
import { useAuthStore } from '@/lib/zustand/authStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import PasswordResetRequestForm from './PasswordResetRequestForm';

export default function Header() {
    const { isLoginOpen, isSignupOpen, isPasswordResetOpen, toggleLogin, toggleSignup, logout, isAuthenticated } = useAuthStore();

  return (
    <header className="bg-white text-dark p-4 font-ltsiptext shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://res.cloudinary.com/veriwoks-sokoyetu/image/upload/v1741705403/Home-images/sguubafg5gk2sbdtqd60.png"
              alt="SokoYetu AI Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-bold text-secondary font-heading">
              SokoYetu AI
            </span>
          </Link>

        {/* Menu Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/marketplace" className="hover:text-primary transition-colors duration-300">
            Market
          </Link>
          <Link href="/products" className="hover:text-primary transition-colors duration-300">
            My Products
          </Link>
          <Link href="/ai-insights" className="hover:text-primary transition-colors duration-300">
            Insights
          </Link>
          <Link href="/messages" className="hover:text-primary transition-colors duration-300">
            Messages
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGlobe} className="text-dark mr-1" />
            <select 
              className="border-none text-dark focus:outline-none"
              aria-label="Language selector"
              title="Select language"
            >
              <option>English</option>
              <option>Swahili</option>
            </select>
          </div>
          <button className="relative">
            <FontAwesomeIcon icon={faBell} className="text-dark" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button aria-label="User profile" title="User profile">
            <FontAwesomeIcon icon={faUser} className="text-dark" />
          </button>
          {isAuthenticated ? (
            <button onClick={logout} className="hover:text-primary">
              Logout
            </button>
          ) : (
            <>
              <button onClick={toggleLogin} className="hover:text-primary">
                Login
              </button>
              <button onClick={toggleSignup} className="bg-primary text-white py-1 px-3 rounded hover:bg-accent">
                Signup
              </button>
            </>
          )}
        </div>
      </div>


      {/* Overlay Forms */}
      {isLoginOpen && <LoginForm />}
      {isSignupOpen && <SignupForm />}
      {isPasswordResetOpen && <PasswordResetRequestForm />}
    </header>
  );
}