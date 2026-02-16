import * as React from 'react';
import {
  Box,
  Card,
  List,
  Divider,
  Link,
  Typography,
  ListItem,
  ListItemText,
} from '@mui/material';
import RightbarItem from './RightbarItem';
import WalletSelector from './WalletSelector';
import { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../store/WalletContext';
import { AlertContext } from '../store/AlertContext';
import { getApiObjectsList } from '../services/APIService';
import FeedbackIcon from '@mui/icons-material/Feedback';
import StyledButton from './StyledButton';
/**
 * Rightbar component to display WalletSelector and Deposits balances on right side of screen
 */
const Rightbar = () => {
  const { setAlert } = useContext(AlertContext);
  const { contextWalletId, refreshTimestamp } = useContext(WalletContext);
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const loadWalletDeposits = async () => {
      if (!contextWalletId) {
        return;
      }
      if (
        !contextWalletId ||
        ['/login', '/register'].includes(window.location.pathname)
      ) {
        setAlert(null);
        return;
      }
      try {
        const response = await getApiObjectsList(
          `${process.env.REACT_APP_BACKEND_URL}/api/wallets/${contextWalletId}/deposits/?ordering=name&fields=id,name,balance`
        );
        setDeposits(response);
      } catch (error) {
        console.error(error);
        setDeposits([]);
      }
    };
    loadWalletDeposits();
  }, [contextWalletId, refreshTimestamp]);

  return (
    <Box width={220} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
      <Box
        position="fixed"
        width={220}
        height="calc(100vh - 64px)" // account for Navbar height
        pt={2}
        display="flex"
        flexDirection="column" // ← stack children vertically
        alignItems="center"
        justifyContent="space-between" // ← push Feedback to bottom
      >
        {/* existing Card with wallet/deposits */}
        <Card>
          <Box
            width={220}
            display="flex"
            flexDirection="column"
            alignItems="center"
            pt={2}
          >
            <WalletSelector />
            <Divider variant="middle" />
            <List sx={{ width: '100%' }}>
              {deposits.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          display: 'block',
                          color: '#000000',
                          width: '100%',
                          textAlign: 'center',
                        }}
                      >
                        {' '}
                        Create first{' '}
                        <Link href="/deposits" underline="hover">
                          Deposit
                        </Link>{' '}
                      </Typography>
                    }
                  />
                </ListItem>
              )}
              {deposits.map((deposit) => (
                <RightbarItem key={deposit.id} deposit={deposit} />
              ))}
            </List>
          </Box>
        </Card>
        <Box mb={2} width="100%" display="flex" justifyContent="flex-end">
          <StyledButton
            variant="outlined"
            href="https://github.com/MateDawid/Budgetory_Backend/issues/new"
            target="_blank"
            startIcon={<FeedbackIcon />}
          >
            Feedback
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};
export default Rightbar;
