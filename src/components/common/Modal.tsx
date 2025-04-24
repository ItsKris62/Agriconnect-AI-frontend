import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, children, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div
        className={cn(
          'bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-105',
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-dark hover:text-primary"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}