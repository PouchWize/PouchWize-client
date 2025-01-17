import { useConnect, useDisconnect, useAccount } from '@starknet-react/core';

const WalletBar: React.FC = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <div className="flex flex-col items-center space-y-4">
      {!address ? (
        <div className="flex flex-wrap justify-center gap-2">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="border border-black text-white font-regular py-2 px-4 bg-purple-700 hover:bg-purple-900 rounded-md"
            >
              Connect {connector.id}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="text-sm bg-gray-200 px-4 py-2 text-purple-700 rounded-md">
            Connected: {address.slice(0, 6)}...{address.slice(-4)}
          </div>
          <button
            onClick={() => disconnect()}
            className="border border-black text-white font-regular py-2 px-4 bg-purple-700 hover:bg-purple-900 rounded-md"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletBar;
