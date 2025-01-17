'use client';

import Image from 'next/image';
import Header from "@/components/Header";
import UserOverviewCard from '@/components/UserOverviewCard';
import LoanTable from '@/components/LoanTable';
import UserAvatar from '/public/Generic avatar.png';
import { useAccount, useBalance } from '@starknet-react/core';
import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import Collateral from '@/components/Collateral';


export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Read your balance
  const { address: userAddress } = useAccount();
  const { isLoading: balanceIsLoading, isError: balanceIsError, error: balanceError, data: balanceData } = useBalance({
    address: userAddress,
    watch: true
  });

  return (
    <main className="max-w-screen px-4 mx-auto sm:px-6 lg:px-8">
        <Header />
        <div className="py-10 px-5 flex flex-col">
          <div className='flex justify-between items-center mb-5 mx-5 px-2'>
            <div className='flex items-center gap-3'>
              <Image src={UserAvatar} alt="User-Friendly Interface" width={30} height={30} />
              <h2 className='text-1xl font-semi-bold text-white'>Welcome, User</h2>
            </div>
            <div className='flex items-center gap-3'>
              <button
                onClick={openModal}
                className="flex items-center gap-2 text-white"
              >
                <h3 className="text-1xl font-bold text-white hover:text-purple-700">Manage Collateral</h3>
              </button>
            </div>
          </div>
          <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <UserOverviewCard title="Total Collateral" value={
              userAddress && !balanceIsLoading && !balanceIsError
                ? `${balanceData?.symbol} ${(Number(balanceData?.formatted) * 1000).toFixed(2)}`
                : 0
            } iconSrc="/Account balance.png" />
            <UserOverviewCard title="Health Factor" value={
              userAddress && !balanceIsLoading && !balanceIsError ? 0 : '100%'
            } iconSrc="/Ellipse 7.png" />
            <UserOverviewCard title="Active Loan" value={userAddress ? 0 : 14} iconSrc="/Task alt.png" />
            <UserOverviewCard title="Available Lending" value={
              userAddress && !balanceIsLoading && !balanceIsError
                ? 0
                : `$45,000`
            } iconSrc="/Group.png" />
          </section>

          <section className="mt-10 bg-#B8B0B01A p-6 rounded-lg shadow-lg">
            <div className='flex justify-between items-center mb-5 mx-5 px-5'>
              <h3 className="text-xl font-bold text-white">Available Loans</h3>
            </div>
            <LoanTable />
          </section>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
              <Collateral />
          </Modal>
        </div>
    </main>
  );
}