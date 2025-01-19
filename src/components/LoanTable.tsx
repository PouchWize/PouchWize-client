import React, { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import RequestLoan from "./RequestLoan";
import { Contract } from "starknet";
import { POUCHWIZE_ABI } from "@/abis/abi";
import { useProvider } from "@starknet-react/core";

const LoanTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noOfLoanListings, setNoOfLoanListings] = useState<null | BigInt>(
        null
    );

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        },
    ] as any[];

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
                            <th>Request Loan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="py-4 text-center text-gray-500"
                                >
                                    No available loans currently
                                </td>
                            </tr>
                        ) : (
                            loans.map((loan, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-gray-700"
                                >
                                    <td className="py-2">{loan.asset}</td>
                                    <td>{loan.interest}</td>
                                    <td>{loan.collateral}</td>
                                    <td>{loan.duration}</td>
                                    <td>{loan.start}</td>
                                    <td>{loan.end}</td>
                                    <td className="text-green-400">
                                        {loan.status}
                                    </td>
                                    <td>
                                        <button
                                            onClick={openModal}
                                            className="flex items-center gap-2 text-white"
                                        >
                                            <h3 className="text-purple-700 m-1 px-2 py-1 rounded-md bg-white hover:text-purple-900">
                                                Request
                                            </h3>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Responsive Table for Small Screens */}
                <div className="sm:hidden">
                    {loans.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No available loans currently
                        </p>
                    ) : (
                        loans.map((loan, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-4 mb-4 rounded-md shadow-md"
                            >
                                <div className="text-gray-400 mb-2">
                                    <div className="font-semibold">Asset:</div>
                                    <div>{loan.asset}</div>
                                </div>
                                <div className="text-gray-400 mb-2">
                                    <div className="font-semibold">
                                        Interest:
                                    </div>
                                    <div>{loan.interest}</div>
                                </div>
                                <div className="text-gray-400 mb-2">
                                    <div className="font-semibold">
                                        Collateral:
                                    </div>
                                    <div>{loan.collateral}</div>
                                </div>
                                <div className="text-gray-400 mb-2">
                                    <div className="font-semibold">
                                        Duration:
                                    </div>
                                    <div>{loan.duration}</div>
                                </div>
                                <div className="text-gray-400 mb-2">
                                    <div className="font-semibold">
                                        Start Day:
                                    </div>
                                    <div>{loan.start}</div>
                                </div>
                                <div className="text-gray-400 mb-2">
                                    <div className="font-semibold">
                                        End Day:
                                    </div>
                                    <div>{loan.end}</div>
                                </div>
                                <div className="text-gray-400 mb-4">
                                    <div className="font-semibold">
                                        Loan Status:
                                    </div>
                                    <div className="text-green-400">
                                        {loan.status}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        onClick={openModal}
                                        className="text-purple-700 bg-white py-1 px-3 rounded-md hover:bg-gray-100"
                                    >
                                        Request Loan
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <RequestLoan />
            </Modal>
        </div>
    );
};

export default LoanTable;

