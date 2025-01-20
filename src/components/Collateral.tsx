import React, { useState } from 'react';
import { Contract, uint256, AccountInterface } from 'starknet';
import { useAccount, useContract, useProvider } from '@starknet-react/core';
import { POUCHWIZE_ABI } from '@/abis/abi';

interface TokenInfo {
  symbol: string;
  address: `0x${string}`;
  decimals: number;
}

const TOKENS: Record<string, TokenInfo> = {
  'STRK': {
    symbol: 'STRK',
    address: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
    decimals: 18
  },
  'ETH': {
    symbol: 'ETH',
    address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    decimals: 18
  }
};

const Collateral: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [action, setAction] = useState<'deposit' | 'withdraw'>('deposit');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { address } = useAccount();
  const { provider } = useProvider();

  const tokens = Object.keys(TOKENS);

  const pouchWizeContract = new Contract(
    POUCHWIZE_ABI,
    process.env.NEXT_PUBLIC_POUCHWIZE_CONTRACT as `0x${string}`,
    provider
  );

  // Convert amount to uint256 with proper decimals
  const getUint256Amount = (amount: string, decimals: number): { low: string, high: string } => {
    const baseAmount = BigInt(parseFloat(amount) * Math.pow(10, decimals));
    return uint256.bnToUint256(baseAmount);
  };

  const approveToken = async (tokenAddress: string, amount: { low: string, high: string }) => {
    try {
      const erc20Abi = [
        {
          name: "approve",
          type: "function",
          inputs: [
            { name: "spender", type: "felt" },
            { name: "amount", type: "Uint256" }
          ],
          outputs: [{ name: "success", type: "felt" }]
        }
      ];

      const erc20Contract = new Contract(erc20Abi, tokenAddress, provider);
      await erc20Contract.approve(
        process.env.NEXT_PUBLIC_POUCHWIZE_CONTRACT,
        amount
      );
    } catch (error) {
      console.error('Error approving token:', error);
      throw new Error('Failed to approve token');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!address || !token) {
        throw new Error('Please connect your wallet and select a token');
      }

      const tokenInfo = TOKENS[token];
      const uint256Amount = getUint256Amount(amount, tokenInfo.decimals);

      if (action === 'deposit') {
        // First approve the token
        await approveToken(tokenInfo.address, uint256Amount);
        
        // Then deposit
        await pouchWizeContract.deposit_collateral(
          tokenInfo.address,
          uint256Amount
        );
      } else {
        // Withdraw
        await pouchWizeContract.withdraw_collateral(
          tokenInfo.address,
          uint256Amount
        );
      }

      // Reset form after successful transaction
      setAmount('');
      setToken('');
      
    } catch (err) {
      console.error('Transaction failed:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
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
      {error && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-white">
          Token
        </label>
        <select
          className="w-full mb-4 rounded border border-gray-300 p-2"
          value={token}
          onChange={handleTokenChange}
          disabled={isLoading}
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
          disabled={isLoading}
          required
        />

        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            className={`flex-1 rounded px-4 py-2 text-white ${
              action === 'deposit'
                ? 'bg-purple-500 hover:bg-purple-700'
                : 'bg-gray-300 hover:bg-gray-400'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setAction('deposit')}
            disabled={isLoading}
          >
            Deposit
          </button>
          <button
            type="button"
            className={`flex-1 rounded px-4 py-2 text-white ${
              action === 'withdraw'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-300 hover:bg-gray-400'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setAction('withdraw')}
            disabled={isLoading}
          >
            Withdraw
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-900"
          disabled={isLoading}
        >
          {action === 'deposit' ? 'Deposit' : 'Withdraw'}
        </button>
      </form>
    </div>
  );
};

export default Collateral;
