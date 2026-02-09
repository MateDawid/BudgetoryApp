import React, { createContext, useState } from 'react';

export const WalletContext = createContext();

/**
 * ContextWalletProvider for storing context Wallet between pages.
 */
export const ContextWalletProvider = ({ children }) => {
  const [contextWalletId, setContextWalletId] = useState(() => {
    const stored = localStorage.getItem('budgetory.contextWallet');
    return stored ? parseInt(stored, 10) : null;
  });
  const [contextWalletCurrency, setContextWalletCurrency] = useState(() => {
    return localStorage.getItem('budgetory.contextWalletCurrency') || null;
  });
  const [refreshTimestamp, setRefreshTimestamp] = useState(null);
  /**
   * Updates refreshTimestamp to current time.
   */
  const updateRefreshTimestamp = () => {
    setRefreshTimestamp(Date.now());
  };

  const value = {
    contextWalletId,
    setContextWalletId,
    contextWalletCurrency,
    setContextWalletCurrency,
    refreshTimestamp,
    updateRefreshTimestamp,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
