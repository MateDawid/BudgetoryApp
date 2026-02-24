import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Paper, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import TransferDataGrid from '../components/TransferDataGrid/TransferDataGrid';
import TransferTypes from '../utils/TransferTypes';
import InfoDialog from '../../app_infrastructure/components/InfoDialog';

const INFO_DIALOG_DATA = {
  title: 'What is an Income?',
  content: (
    <>
      <Typography>
        An Income is a record of money you received from an Entity (person,
        company, or organization) that was deposited into one of your Deposits.
      </Typography>
      <Typography sx={{ marginTop: 1 }}>
        Each Income includes the amount, date, source (Entity), destination
        (Deposit), and can be categorized to track different income types like
        salary, bonuses, or gifts.
      </Typography>
    </>
  ),
};

/**
 * IncomeList component to display list of Wallet INCOME Transfers.
 */
export default function IncomeList() {
  document.title = 'Incomes';
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
            Incomes
          </Typography>
          <InfoDialog
            dialogOpened={infoDialogOpened}
            setDialogOpened={setInfoDialogOpened}
            dialogTitle={INFO_DIALOG_DATA.title}
            dialogContent={INFO_DIALOG_DATA.content}
          />
        </Stack>
        <Divider sx={{ marginBottom: 1 }} />
        <TransferDataGrid transferType={TransferTypes.INCOME} />
      </Paper>
    </>
  );
}
