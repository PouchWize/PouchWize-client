import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white hover:bg-gray-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform"
            aria-label="Close"
          >
            <span className="text-lg font-bold">✖</span>
          </button>
          {children}
        </div>
      </div>
    );
};
  

export default Modal;
