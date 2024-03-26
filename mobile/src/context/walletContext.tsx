import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  walletAddress: string;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}
 
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
