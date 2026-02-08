import React, { createContext, useState, useEffect } from 'react';

export const WalletContext = createContext();

/**
 * ContextWalletProvider for storing context Wallet between pages.
 */
export const ContextWalletProvider = ({ children }) => {
  const [contextWalletId, setContextWalletId] = useState(null);
  const [contextWalletCurrency, setContextWalletCurrency] = useState(null);
  const [refreshTimestamp, setRefreshTimestamp] = useState(null);

  // Automatically load from localStorage on mount
  useEffect(() => {
    const storageContextWalletId = localStorage.getItem('budgetory.contextWallet')
      ? parseInt(localStorage.getItem('budgetory.contextWallet'), 10)
      : null;
    const storageContextWalletCurrency =
      localStorage.getItem('budgetory.contextWalletCurrency') || null;
    setContextWalletId(storageContextWalletId);
    setContextWalletCurrency(storageContextWalletCurrency);
  }, []);

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
