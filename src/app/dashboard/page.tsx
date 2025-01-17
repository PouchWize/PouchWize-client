'use client';

import Image from 'next/image';
import Header from "@/components/Header";
import UserOverviewCard from '@/components/UserOverviewCard';
import LoanTable from '@/components/LoanTable';
import UserAvatar from '/public/Generic avatar.png';
import Notification from '/public/Notifications none.png';
import Plus from '/public/Plus.png';
import Link from 'next/link';
import { useAccount, useBalance } from '@starknet-react/core';


export default function Dashboard() {

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
            <Image src={Notification} alt="User-Friendly Interface" width={30} height={30} />
          </div>
          <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <UserOverviewCard title="Total Collateral" value={
              userAddress && !balanceIsLoading && !balanceIsError
                ? `${balanceData?.symbol} ${(Number(balanceData?.formatted) * 1000).toFixed(2)}`
                : 0
            } iconSrc="/Account balance.png" />
            <UserOverviewCard title="Health Factor" value={
              userAddress && !balanceIsLoading && !balanceIsError ? '100%' : 0
            } iconSrc="/Ellipse 7.png" />
            <UserOverviewCard title="Active Loan" value={userAddress ? 14 : 0} iconSrc="/Task alt.png" />
            <UserOverviewCard title="Available Lending" value={
              userAddress && !balanceIsLoading && !balanceIsError
                ? `$45,000`
                : 0
            } iconSrc="/Group.png" />
          </section>

          <section className="mt-10 bg-#B8B0B01A p-6 rounded-lg shadow-lg">
            <div className='flex justify-between items-center mb-5 mx-5 px-5'>
              <h3 className="text-xl font-bold text-white">Available Loans</h3>
              <Link href={'/'} className='flex items-center gap-2'>
                <Image src={Plus} alt="User-Friendly Interface" width={30} height={30} />
                <h3 className="text-1xl font-bold text-white">Create Loans</h3>
              </Link>
            </div>
            <LoanTable />
          </section>
        </div>
    </main>
  );
}