'use client';

import React from 'react';
import { InputField } from '@/components/ui/Form';

const RequestLoan = () => (
  <div className="max-w-md p-6 bg-gray-800 rounded-md shadow-md">
    <h1 className="text-xl font-semibold mb-4 text-white text-center">Request Loan</h1>
    <form>
      <InputField label="Amount" type="number" placeholder="e.g., 1.5" />
      <button className="mt-4 w-full rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-900">
        Request
      </button>
    </form>
  </div>
);

export default RequestLoan;