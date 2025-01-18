// components/ui/Form.tsx

import React, { ChangeEvent } from "react";

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
}

interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: { [key: string]: string };
    error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    error,
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                min={type == "number" ? 0 : ""}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    error ? "border-red-500" : "border-gray-600"
                }`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    error,
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    error ? "border-red-500" : "border-gray-600"
                }`}
            >
                <option value="">Select a token</option>
                {Object.entries(options).map(([key, value]) => (
                    <option key={value} value={key}>
                        {key}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};
