'use client';

import Navbar from "@/components/NavBar";
import Image from 'next/image';
import Link from "next/link";
import SecureTraction from "/public/transaction.png";
import UserInterface from "/public/user-interface.png";
import EarnBonuses from "/public/bonuses.png";
import LoanHealth from "/public/health.png";

export default function Home() {

  return (
    <main className="max-w-screen px-4 mx-auto sm:px-6 lg:px-8">
        <Navbar />
        <div className="py-10 px-5 flex justify-between items-center">
          <div className="max-w-xl mt-7">
            <h1 className="text-4xl font-bold mb-3 text-white">PouchWize: Easy Crypto Lending & Borrowing</h1>
            <p className="text-xl text-gray-300">Pouchwize lets you borrow and lend crypto directly to other people. No middleman needed. Make money on your crypto or borrow money quickly using your crypto as backup</p>
            <Link href={'/dashboard'}>
              <button type="button" className="inline-flex items-center justify-center rounded-md mt-8 px-10 py-2 text-gray-100 bg-purple-700 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="py-10 px-5 mt-5 flex justify-between items-center">
          <div className="max-w-screen">
            <h2 className="text-3xl font-bold text-white flex justify-center">Why Choose Pouchwise</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col items-center gap-2 h-25 hover:bg-purple-700 p-5 rounded-lg">
                  <Image src={UserInterface} alt="User-Friendly Interface" width={50} height={50} />
                  <h3 className="text-xl font-bold text-gray-300">User-Friendly Interface</h3>
                  <p className="text-gray-300">Easily navigate our platform with a simple design that makes borrowing and lending straightforward for everyone</p>
                </div>
                <div className="flex flex-col items-center gap-2 h-25 hover:bg-purple-700 p-5 rounded-lg">
                  <Image src={SecureTraction} alt="Secure Transactions" width={50} height={50} />
                  <h3 className="text-xl font-bold text-gray-300">Secure Transactions</h3>
                  <p className="text-gray-300">Your funds are protected by smart contracts, ensuring that all agreements are safe and reliable. Borrowers deposit collateral, providing security for lenders in case of non-payment</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col items-center gap-2 h-25 hover:bg-purple-700 p-5 rounded-lg">
                  <Image src={EarnBonuses} alt="Earn Bonuses" width={50} height={50} />
                  <h3 className="text-xl font-bold text-gray-300">Earn Bonuses</h3>
                  <p className="text-gray-300">Receive bonuses for executing successful liquidations. Your proactive efforts are rewarded, enhancing your overall earnings</p>
                </div>
                <div className="flex flex-col items-center gap-2 h-25 hover:bg-purple-700 p-5 rounded-lg">
                  <Image src={LoanHealth} alt="Loan Health Checker" width={50} height={50} />
                  <h3 className="text-xl font-bold text-gray-300">Loan Health Checker</h3>
                  <p className="text-gray-300">Use our Loan Health Checker to assess your financial situation. This tool helps you evaluate your borrowing capacity and manage your loans effectively</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}