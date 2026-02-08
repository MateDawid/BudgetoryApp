import React, { createContext, useContext, useEffect, useState } from 'react';
import { getApiObjectsList } from '../services/APIService';
import { WalletContext } from './WalletContext';

export const PeriodChoicesContext = createContext();

/**
 * PeriodChoicesProvider for storing choices fields options for PeriodChoices purposes.
 */
export const PeriodChoicesProvider = ({ children }) => {
  const { getContextWalletId } = useContext(WalletContext);
  const [periodChoices, setPeriodChoices] = useState([]);

  useEffect(() => {
    const loadPeriodsChoices = async () => {
      const contextWalletId = getContextWalletId();
      if (!contextWalletId) {
        return;
      }

      try {
        const response = await getApiObjectsList(
          `${process.env.REACT_APP_BACKEND_URL}/api/wallets/${contextWalletId}/periods/?ordering=-date_start&fields=value,label`
        );
        setPeriodChoices(response);
      } catch {
        setPeriodChoices([]);
      }
    };

    loadPeriodsChoices();
  }, [getContextWalletId]);

  const value = { periodChoices };

  return (
    <PeriodChoicesContext.Provider value={value}>
      {children}
    </PeriodChoicesContext.Provider>
  );
};
