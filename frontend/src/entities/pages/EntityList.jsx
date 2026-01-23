import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Paper, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import EntityDataGrid, { EntityTypes } from '../components/EntityDataGrid';
import InfoDialog from '../../app_infrastructure/components/InfoDialog';

const INFO_DIALOG_DATA = {
  title: 'What is an Entity?',
  content: (
    <Typography>
      An Entity is the counterparty in your transactions. While your Deposits
      receive Incomes and pay Expenses, Entities are on the opposite side - they
      send you Incomes or receive your Expenses.
    </Typography>
  ),
};

/**
 * EntityList component to display list of Wallet Entities.
 */
export default function EntityList() {
  document.title = 'Entities';
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
          Entities
        </Typography>
        <InfoDialog
          dialogOpened={infoDialogOpened}
          setDialogOpened={setInfoDialogOpened}
          dialogTitle={INFO_DIALOG_DATA.title}
          dialogContent={INFO_DIALOG_DATA.content}
        />
      </Stack>
      <Divider sx={{ mb: 1 }} />
      <EntityDataGrid entityType={EntityTypes.ENTITY} />
    </Paper>
  );
}
