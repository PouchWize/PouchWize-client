'use client';

import { loans } from '@/components/loanMockData';
import RequestLoan from '@/components/RequestLoan';
import Modal from '@/components/ui/Modal';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

interface Loan {
  id: string;
  asset: string;
  interest: string;
  collateral: string;
  duration: string;
  start: string;
  end: string;
  status: string;
}

export default function LoanDetailsPage({ params }: PageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const loan = loans.find((loan) => loan.id === params.id);

  if (!loan) {
    notFound();
  }

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Loan Details</h2>
        <Link href="/market-place">
          <button className="bg-white text-purple-700 hover:text-purple-900 px-4 py-2 rounded-md">
            Back to Loans
          </button>
        </Link>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <p>
          <span className="font-semibold text-gray-400">Asset:</span> {loan.asset}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Interest:</span> {loan.interest}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Collateral:</span> {loan.collateral}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Duration:</span> {loan.duration}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Start Date:</span> {loan.start}
        </p>
        <p>
          <span className="font-semibold text-gray-400">End Date:</span> {loan.end}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Status:</span>{' '}
          <span className="text-green-400">{loan.status}</span>
        </p>
      </div>
      <div className='mt-10'>
        <button
          onClick={openModal}
          className="flex items-center gap-2 text-white"
        >
          <h3 className="text-purple-700 m-1 px-2 py-1 rounded-md bg-white hover:text-purple-900">
            Request
          </h3>
        </button>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <RequestLoan />
      </Modal>
    </div>
  );
}