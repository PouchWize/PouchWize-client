"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { InputField, SelectField } from "@/components/ui/Form";
import { useAccount } from "@starknet-react/core";
import { POUCHWIZE_ABI } from "@/abis/abi";
import { Contract, RawArgs } from "starknet";

interface LoanFormData {
    amount: string;
    min_amount: string;
    max_amount: string;
    interest: string;
    token: string;
}

interface FormErrors {
    amount?: string;
    min_amount?: string;
    max_amount?: string;
    interest?: string;
    token?: string;
}

interface CreateLoanProps {
    onSuccess?: () => void;
}

const CreateLoan: React.FC<CreateLoanProps> = ({ onSuccess }) => {
    const { account } = useAccount();

    const pouchWizeContract = new Contract(
        POUCHWIZE_ABI,
        process.env.NEXT_PUBLIC_POUCHWIZE_CONTRACT as `0x${string}`,
        account
    );

    const [formData, setFormData] = useState<LoanFormData>({
        amount: "",
        min_amount: "",
        max_amount: "",
        interest: "",
        token: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const pouchTokens = {
        PouchUSD:
            "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        WizeUSD:
            "0x053b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080",
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = "Please enter a valid amount greater than 0";
        }

        if (
            !formData.min_amount ||
            parseFloat(formData.min_amount) <= 0 ||
            parseFloat(formData.min_amount) > parseFloat(formData.max_amount)
        ) {
            newErrors.min_amount =
                "Please enter a valid amount greater than 0 and less than max amount";
        }

        if (
            !formData.max_amount ||
            parseFloat(formData.max_amount) <= 0 ||
            parseFloat(formData.max_amount) <= parseFloat(formData.min_amount)
        ) {
            newErrors.max_amount =
                "Please enter a valid amount greater than 0 and more than min amount";
        }

        if (
            !formData.interest ||
            parseFloat(formData.interest) < 0 ||
            parseFloat(formData.interest) > 100
        ) {
            newErrors.interest =
                "Please enter a valid interest rate between 0 and 100";
        }

        if (!formData.token) {
            newErrors.token = "Please select a token";
        }

        return newErrors;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            console.log("Form validation errors:", formErrors);
            setErrors(formErrors);
            return;
        }

        const submissionData = {
            ...formData,
            tokenAddress:
                pouchTokens[formData.token as keyof typeof pouchTokens],
        };
        console.log("Form submitted with values:", submissionData);

        const loanListingAmount = BigInt(submissionData.amount);
        const minLoanAmount = BigInt(submissionData.min_amount);
        const maxLoanAmount = BigInt(submissionData.max_amount);
        const loanInterestRate = BigInt(submissionData.interest);
        const loanToken = submissionData.tokenAddress as `0x${string}`;

        console.log(
            loanListingAmount,
            minLoanAmount,
            maxLoanAmount,
            loanInterestRate,
            loanToken
        );

        const populatedTX = await pouchWizeContract.create_loan_listing(
            String(loanListingAmount),
            String(minLoanAmount),
            String(maxLoanAmount),
            loanInterestRate,
            loanToken
        );

        console.log(populatedTX);
        // const res = await
        // console.log(res);

        // setFormData({
        //     amount: "",
        //     max_amount: "",
        //     min_amount: "",
        //     interest: "",
        //     token: "",
        // });

        // onSuccess?.();
    };

    return (
        <div className="max-w-md p-6 bg-gray-800 rounded-md shadow-md">
            <h1 className="text-xl font-semibold mb-4 text-white text-center">
                Create Loan Listing
            </h1>

            <form
                onSubmit={handleSubmit}
                className="max-h-[20rem] overflow-auto pr-2 custom-scrollbar"
            >
                <InputField
                    label="Amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="e.g., 15"
                    error={errors.amount}
                />
                <InputField
                    label="Minimum Loanable amount"
                    type="number"
                    name="min_amount"
                    value={formData.min_amount}
                    onChange={handleChange}
                    placeholder="e.g., 2"
                    error={errors.min_amount}
                />
                <InputField
                    label="Maximum Loanable amount"
                    type="number"
                    name="max_amount"
                    value={formData.max_amount}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                    error={errors.max_amount}
                />
                <InputField
                    label="Interest"
                    type="number"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    placeholder="e.g., 5%"
                    error={errors.interest}
                />
                <SelectField
                    label="Token"
                    name="token"
                    value={formData.token}
                    onChange={handleChange}
                    options={pouchTokens}
                    error={errors.token}
                />
                <button
                    className="mt-4 w-full rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-900"
                    type="submit"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateLoan;
