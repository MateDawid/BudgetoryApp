import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Paper, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import TransferDataGrid from '../components/TransferDataGrid/TransferDataGrid';
import TransferTypes from '../utils/TransferTypes';
import InfoDialog from '../../app_infrastructure/components/InfoDialog';

const INFO_DIALOG_DATA = {
  title: 'What is an Expense?',
  content: (
    <>
      <Typography>
        An Expense is a record of money you paid from one of your Deposits to an
        Entity (person, company, or organization).
      </Typography>
      <Typography sx={{ marginTop: 1 }}>
        Each Expense includes the amount, date, destination (Entity), source
        (Deposit), and can be categorized to track different spending types like
        groceries, utilities, or entertainment.
      </Typography>
    </>
  ),
};

/**
 * ExpenseList component to display list of Wallet EXPENSE Transfers.
 */
export default function ExpenseList() {
  document.title = 'Expenses';
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
            Expenses
          </Typography>
          <InfoDialog
            dialogOpened={infoDialogOpened}
            setDialogOpened={setInfoDialogOpened}
            dialogTitle={INFO_DIALOG_DATA.title}
            dialogContent={INFO_DIALOG_DATA.content}
          />
        </Stack>
        <Divider sx={{ marginBottom: 1 }} />
        <TransferDataGrid transferType={TransferTypes.EXPENSE} />
      </Paper>
    </>
  );
}
