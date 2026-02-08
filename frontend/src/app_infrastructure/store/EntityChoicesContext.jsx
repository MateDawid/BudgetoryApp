import React, { createContext, useContext, useEffect, useState } from 'react';
import { getApiObjectsList } from '../services/APIService';
import { WalletContext } from './WalletContext';

export const EntityChoicesContext = createContext();

/**
 * EntityChoicesProvider for storing choices fields options for EntityChoices purposes.
 */
export const EntityChoicesProvider = ({ children }) => {
  const { getContextWalletId } = useContext(WalletContext);
  const [entityChoices, setEntityChoices] = useState([]);

  useEffect(() => {
    const loadEntityChoices = async () => {
      const contextWalletId = getContextWalletId();
      if (!contextWalletId) {
        return;
      }
      try {
        const response = await getApiObjectsList(
          `${process.env.REACT_APP_BACKEND_URL}/api/wallets/${contextWalletId}/entities/?ordering=-is_deposit,name`
        );
        setEntityChoices(response);
      } catch {
        setEntityChoices([]);
      }
    };

    loadEntityChoices();
  }, [getContextWalletId]);

  const value = { entityChoices };

  return (
    <EntityChoicesContext.Provider value={value}>
      {children}
    </EntityChoicesContext.Provider>
  );
};
