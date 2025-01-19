'use client';

import React from "react";
import Link from "next/link";
import { loans } from './loanMockData';

const LoanTable = () => {

    return (
      <div className="p-6 text-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse hidden sm:table">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-2">Asset</th>
                <th>Interest</th>
                <th>Collateral</th>
                <th>Duration</th>
                <th>Start Day</th>
                <th>End Day</th>
                <th>Loan Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-gray-500">
                    No available loans currently
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan.id} className="border-t border-gray-700">
                    <td className="py-2">{loan.asset}</td>
                    <td>{loan.interest}</td>
                    <td>{loan.collateral}</td>
                    <td>{loan.duration}</td>
                    <td>{loan.start}</td>
                    <td>{loan.end}</td>
                    <td className="text-green-400">{loan.status}</td>
                    <td>
                    <Link href={`/loan/${loan.id}`} as={`/loan/${loan.id}`}>
                        <button className="bg-white text-purple-700 hover:text-purple-900 px-4 py-2 rounded-md">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
  
          {/* Mobile Cards */}
          <div className="sm:hidden">
            {loans.length === 0 ? (
              <p className="text-center text-gray-500">No available loans currently</p>
            ) : (
              loans.map((loan) => (
                <div
                  key={loan.id}
                  className="bg-gray-800 p-4 mb-4 rounded-md shadow-md"
                >
                  <div className="mb-2">
                    <span className="font-semibold text-gray-400">Asset:</span>{' '}
                    {loan.asset}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-400">Interest:</span>{' '}
                    {loan.interest}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-400">Collateral:</span>{' '}
                    {loan.collateral}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-400">Duration:</span>{' '}
                    {loan.duration}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-400">Start Day:</span>{' '}
                    {loan.start}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-400">End Day:</span>{' '}
                    {loan.end}
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold text-gray-400">Loan Status:</span>{' '}
                    <span className="text-green-400">{loan.status}</span>
                  </div>
                  <Link href={`/loan/${loan.id}`}>
                    <button className="bg-white text-purple-700 hover:text-purple-900 px-4 py-2 rounded-md">
                      View
                    </button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
};

export default LoanTable;

