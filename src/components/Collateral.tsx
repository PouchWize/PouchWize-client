import React, { useState } from 'react';

const Collateral: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [action, setAction] = useState<'deposit' | 'withdraw'>('deposit');

  const tokens = ['STRK', 'ETH', 'BTC', 'USDC', 'USDT', 'BNB', 'TON'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`${action} ${amount} ${token}`);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToken(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4 text-white text-center">Manage Collateral</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-white">
          Token
        </label>
        <select
          className="w-full mb-4 rounded border border-gray-300 p-2"
          value={token}
          onChange={handleTokenChange}
          required
        >
          <option value="" disabled>
            Select a token
          </option>
          {tokens.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-sm font-medium text-white">
          Amount
        </label>
        <input
          type="number"
          className="w-full mb-4 rounded border border-gray-300 p-2"
          placeholder="e.g., 1.5"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          step="any"
          required
        />

        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            className={`flex-1 rounded px-4 py-2 text-white ${
              action === 'deposit'
                ? 'bg-purple-500 hover:bg-purple-700'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setAction('deposit')}
          >
            Deposit
          </button>
          <button
            type="button"
            className={`flex-1 rounded px-4 py-2 text-white ${
              action === 'withdraw'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setAction('withdraw')}
          >
            Withdraw
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-900"
        >
          {action === 'deposit' ? 'Deposit' : 'Withdraw'}
        </button>
      </form>
    </div>
  );
};

export default Collateral;
