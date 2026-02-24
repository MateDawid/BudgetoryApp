import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Paper, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import EntityDataGrid, { EntityTypes } from '../components/EntityDataGrid';
import InfoDialog from '../../app_infrastructure/components/InfoDialog';

const INFO_DIALOG_DATA = {
  title: 'What is a Deposit?',
  content: (
    <Typography>
      A Deposit represents an account or place where your funds are stored, such
      as a bank account, brokerage account, cash wallet, or physical assets like
      gold.
    </Typography>
  ),
};

/**
 * DepositList component to display list of Wallet Deposits.
 */
export default function DepositList() {
  document.title = 'Deposits';
  const [infoDialogOpened, setInfoDialogOpened] = useState(false);

  return (
    <Paper
      elevation={24}
      sx={{
        padding: 2,
        bgColor: '#F1F1F1',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={1}
        mb={1}
      >
        <Typography variant="h4" sx={{ display: 'block', color: '#BD0000' }}>
          Deposits
        </Typography>
        <InfoDialog
          dialogOpened={infoDialogOpened}
          setDialogOpened={setInfoDialogOpened}
          dialogTitle={INFO_DIALOG_DATA.title}
          dialogContent={INFO_DIALOG_DATA.content}
        />
      </Stack>
      <Divider sx={{ mb: 1 }} />
      <EntityDataGrid entityType={EntityTypes.DEPOSIT} />
    </Paper>
  );
}
