import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Paper, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import CategoryDataGrid from '../components/CategoryDataGrid';
import InfoDialog from '../../app_infrastructure/components/InfoDialog';

const INFO_DIALOG_DATA = {
  title: 'What is Category?',
  content: (
    <>
      <Typography>
        Categories organize your Incomes and Expenses by type and priority. Use
        them to group transactions by their source (for Income) or purpose (for
        Expense), and to plan your budget within each Period.
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      <Stack direction="row" justifyContent="space-around" spacing={1.5}>
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">
            Income Priorities:
          </Typography>
          <Typography variant="body2">
            📈 01. Regular
            <br />
            📈 02. Irregular
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" fontWeight="bold">
            Expense Priorities:
          </Typography>
          <Typography variant="body2">
            📉 01. Most important
            <br />
            📉 02. Savings and investments
            <br />
            📉 03. Others
          </Typography>
        </Box>
      </Stack>
    </>
  ),
};

/**
 * TransferCategoryList component to display list of Wallet TransferCategories.
 */
export default function TransferCategoryList() {
  document.title = 'Categories';
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
          Categories
        </Typography>
        <InfoDialog
          dialogOpened={infoDialogOpened}
          setDialogOpened={setInfoDialogOpened}
          dialogTitle={INFO_DIALOG_DATA.title}
          dialogContent={INFO_DIALOG_DATA.content}
        />
      </Stack>
      <Divider sx={{ mb: 1 }} />
      <CategoryDataGrid />
    </Paper>
  );
}
