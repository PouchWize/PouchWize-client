import React from "react";

const LoanTable = () => {
    const loans = [
      {
        asset: "BTC",
        interest: "5%",
        collateral: "0.05 BTC",
        duration: "30 days",
        start: "10/01/2025",
        end: "10/02/2025",
        status: "Active",
      },
      {
        asset: "BTC",
        interest: "2%",
        collateral: "0.1 BTC",
        duration: "90 days",
        start: "1/01/2025",
        end: "1/04/2025",
        status: "Active",
      }
    ] as any[];

  return (
    <div className="p-6 text-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-2">Asset</th>
            <th>Interest</th>
            <th>Collateral</th>
            <th>Duration</th>
            <th>Start Day</th>
            <th>End Day</th>
            <th>Loan Status</th>
            <th>Request Loan</th>
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
            loans.map((loan, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2">{loan.asset}</td>
                <td>{loan.interest}</td>
                <td>{loan.collateral}</td>
                <td>{loan.duration}</td>
                <td>{loan.start}</td>
                <td>{loan.end}</td>
                <td className="text-green-400">{loan.status}</td>
                <td>
                  <button className="bg-white text-purple-600 hover:text-purple-900 px-2 py-1 rounded">
                    Request
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;
