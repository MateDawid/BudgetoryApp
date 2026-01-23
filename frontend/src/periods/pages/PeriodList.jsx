import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Paper, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import PeriodDataGrid from '../components/PeriodDataGrid';
import InfoDialog from '../../app_infrastructure/components/InfoDialog';

const INFO_DIALOG_DATA = {
  title: 'What is a Period?',
  content: (
    <>
      <Typography>
        A Period is a date range used to organize your Incomes and Expenses for
        budgeting and tracking purposes.
      </Typography>
      <Typography sx={{ marginTop: 1 }}>
        For example, you might create a Period for <b>January 2026</b> to track
        all transactions from 01.01.2026 to 31.01.2026, or a <b>Q1 2026</b>{' '}
        Period for quarterly planning.
      </Typography>
    </>
  ),
};

/**
 *  PeriodList component to display list of Wallet  Periods.
 */
export default function PeriodList() {
  document.title = 'Periods';
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
          Periods
        </Typography>
        <InfoDialog
          dialogOpened={infoDialogOpened}
          setDialogOpened={setInfoDialogOpened}
          dialogTitle={INFO_DIALOG_DATA.title}
          dialogContent={INFO_DIALOG_DATA.content}
        />
      </Stack>
      <Divider />
      <PeriodDataGrid />
    </Paper>
  );
}
