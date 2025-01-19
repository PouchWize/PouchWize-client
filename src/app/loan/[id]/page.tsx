'use client';

import { loans } from '@/components/loanMockData';
import RepayLoan from '@/components/RepayLoan';
import RequestLoan from '@/components/RequestLoan';
import Modal from '@/components/ui/Modal';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { useProvider } from "@starknet-react/core";
import { Contract } from "starknet";
import { POUCHWIZE_ABI } from "@/abis/abi";


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
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);
  const [noOfLoanListings, setNoOfLoanListings] = useState<null | BigInt>(
    null
);

  const openRequestModal = () => setIsRequestModalOpen(true);
  const closeRequestModal = () => setIsRequestModalOpen(false);
  
  const openRepayModal = () => setIsRepayModalOpen(true);
  const closeRepayModal = () => setIsRepayModalOpen(false);

  const { provider } = useProvider();

    const pouchWizeContract = new Contract(
        POUCHWIZE_ABI,
        process.env.NEXT_PUBLIC_POUCHWIZE_CONTRACT as `0x${string}`,
        provider
    );

    useEffect(() => {
        async function getLoanListings() {
            const res = await pouchWizeContract.get_total_listings();
            setNoOfLoanListings(res);
        }

        getLoanListings();
    }, []);

    useEffect(() => {
        const fetchLoanListings = async () => {
            if (noOfLoanListings != null) {
                console.log(noOfLoanListings);
                try {
                    for (let i = 0; i < Number(noOfLoanListings); i++) {
                        const res = await pouchWizeContract.get_loan_details(
                            BigInt(i)
                        );
                        console.log(res);
                    }
                } catch (error) {
                    console.error("Error fetching loan listings:", error);
                }
            }
        };

        fetchLoanListings();
    }, [noOfLoanListings]);

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
      <div className='mt-10 flex justify-between items-center'>
        <button
          onClick={openRequestModal}
          className="flex items-center gap-2 text-white"
        >
          <h3 className="text-purple-700 m-1 px-2 py-1 rounded-md bg-white hover:text-purple-900">
            Request
          </h3>
        </button>

        <button
          onClick={openRepayModal}
          className="flex items-center gap-2 text-white"
        >
          <h3 className="text-purple-700 m-1 px-2 py-1 rounded-md bg-white hover:text-purple-900">
            Repay
          </h3>
        </button>
      </div>
      
      <Modal isOpen={isRequestModalOpen} onClose={closeRequestModal}>
        <RequestLoan />
      </Modal>

      <Modal isOpen={isRepayModalOpen} onClose={closeRepayModal}>
        <RepayLoan />
      </Modal>
    </div>
  );
}