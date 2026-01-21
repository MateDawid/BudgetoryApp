import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Paper, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import WalletDataGrid from '../components/WalletDataGrid';
import InfoDialog from '../../app_infrastructure/components/InfoDialog';

const INFO_DIALOG_DATA = {
  title: 'What is Wallet?',
  content: (
    <>
      <Typography>
        A Wallet organizes multiple Deposits under a common purpose.
      </Typography>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={1}
      >
        <Box>
          <Typography variant="h6">Wallet "Daily expenses"</Typography>
          <Typography fontStyle="italic">
            Purpose: To cover daily expenses.
          </Typography>
          <Typography>• Deposit "Personal account"</Typography>
          <Typography>• Deposit "Common account"</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Wallet "Savings"</Typography>
          <Typography fontStyle="italic">Purpose: To save money.</Typography>
          <Typography>• Deposit "Brokerage account"</Typography>
          <Typography>• Deposit "Treasury bonds"</Typography>
        </Box>
      </Stack>
    </>
  ),
};

/**
 * IncomeList component to display list of Wallet INCOME Transfers.
 */
export default function WalletList() {
  document.title = 'Wallets';
  const [infoDialogOpened, setInfoDialogOpened] = useState(false);

  return (
    <>
      <Paper elevation={24} sx={{ padding: 2, bgColor: '#F1F1F1' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
          mb={1}
        >
          <Typography variant="h4" sx={{ display: 'block', color: '#BD0000' }}>
            Wallets
          </Typography>
          <InfoDialog
            dialogOpened={infoDialogOpened}
            setDialogOpened={setInfoDialogOpened}
            dialogTitle={INFO_DIALOG_DATA.title}
            dialogContent={INFO_DIALOG_DATA.content}
          />
        </Stack>
        <Divider sx={{ marginBottom: 1 }} />
        <WalletDataGrid />
      </Paper>
    </>
  );
}
