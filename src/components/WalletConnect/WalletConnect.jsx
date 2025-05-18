import React, { useState, useEffect } from 'react';
import './WalletConnect.css';

const WalletConnect = () => {
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setError('Please install MetaMask!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      setError('Error checking wallet connection');
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setError('Please install MetaMask!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      setError('Error connecting wallet');
      console.error(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <button onClick={connectWallet} className="connect-button">
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <span className="account">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button onClick={() => setIsConnected(false)} className="disconnect-button">
            Disconnect
          </button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WalletConnect; 