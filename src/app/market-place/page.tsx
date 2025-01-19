'use client';

import Header from "@/components/Header";
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import CreateLoan from '@/components/CreateLoan';
import LoanTable from '@/components/LoanTable';
import { Button } from '@/components/ui/Button';


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="max-w-screen px-4 mx-auto sm:px-6 lg:px-8">
        <Header />
        <div>
          <section className="mt-10 bg-gray-800 bg-opacity-10 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-5 mx-5 px-5">
              <h3 className="text-xl font-bold text-white">Available Loans</h3>
            </div>
            <LoanTable />
          </section>

          <div className="max-w-xl mt-10 mb-10">
            <Button
              onClick={openModal}
              className="flex items-center gap-2 text-white"
            >
              <h3 className="text-1xl font-bold text-white bg-purple-700 hover:bg-purple-900">Post Loan Offer</h3>
            </Button>
          </div>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <CreateLoan />
          </Modal>
        </div>
    </main>
  );
}

