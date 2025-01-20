'use client';

import Image from 'next/image';
import Header from "@/components/Header";
import UserOverviewCard from '@/components/UserOverviewCard';
import LoanTable from '@/components/LoanTable';
import UserAvatar from '/public/Generic avatar.png';
import { useAccount, useProvider, useBalance } from '@starknet-react/core';
import Modal from '@/components/ui/Modal';
import { useEffect, useState } from 'react';
import Collateral from '@/components/Collateral';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Contract } from "starknet";
import { POUCHWIZE_ABI } from "@/abis/abi";


export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalCollateral, setTotalCollateral] = useState<bigint | null>(null);
  const [healthFactor, setHealthFactor] = useState<number | null>(null);
  const [activeLoans, setActiveLoans] = useState<bigint[]>([]);
  const [availableListings, setAvailableListings] = useState<bigint[]>([]);
  
  const { address: userAddress } = useAccount();
  const { provider } = useProvider();

  const pouchWizeContract = new Contract(
    POUCHWIZE_ABI,
    process.env.NEXT_PUBLIC_POUCHWIZE_CONTRACT as `0x${string}`,
    provider
  );

  useEffect(() => {
    async function fetchUserData() {
      if (!userAddress) return;

      try {
        // Get total collateral value
        const collateralValue = await pouchWizeContract.get_total_collateral_value(userAddress);
        setTotalCollateral(collateralValue);

        // Get health status
        const healthStatus = await pouchWizeContract.get_user_health_status(userAddress);
        setHealthFactor(Number(healthStatus));

        // Get active loans
        const userActiveLoans = await pouchWizeContract.get_user_active_loans(userAddress);
        setActiveLoans(userActiveLoans);

        // Get available listings
        const listings = await pouchWizeContract.get_available_listings();
        setAvailableListings(listings);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [userAddress, provider]);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const formatCollateralValue = (value: bigint | null): string => {
    if (value === null) return "$0.00";
    return `$${(Number(value) / 1e18).toFixed(2)}`;
  };

  return (
    <main className="max-w-screen px-4 mx-auto sm:px-6 lg:px-8">
        <Header />
        <div className="py-10 px-5 flex flex-col">
          <div className='flex justify-between items-center mb-5 mx-5 px-2'>
            <div className='flex items-center gap-3'>
              <Image src={UserAvatar} alt="User-Friendly Interface" width={30} height={30} />
              <h2 className='text-1xl font-semi-bold text-white'>
                {userAddress ? `Welcome, ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : 'Welcome, User'}
              </h2>
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
            <UserOverviewCard title="Total Collateral" value={formatCollateralValue(totalCollateral)} iconSrc="/Account balance.png" />
            <UserOverviewCard title="Health Factor" value={healthFactor ? `${healthFactor}%` : '0%'} iconSrc="/Ellipse 7.png" />
            <UserOverviewCard title="Active Loan" value={activeLoans.length} iconSrc="/Task alt.png" />
            <UserOverviewCard title="Available Lending" value={`${availableListings.length} listings`} iconSrc="/Group.png" />
          </section>

          <section className="mt-10 bg-#B8B0B01A p-6 rounded-lg shadow-lg">
            <div className='flex justify-between items-center mb-5 mx-5 px-5'>
              <h3 className="text-xl font-bold text-white">Available Loans</h3>
            </div>
            <LoanTable />
            <Link href={'/market-place'}><Button>Load more</Button></Link>
          </section>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
              <Collateral />
          </Modal>
        </div>
    </main>
  );
}