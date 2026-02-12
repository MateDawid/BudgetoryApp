import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import React, { useContext, useEffect, useState } from 'react';
import PeriodResultsHeader from './PeriodResultsHeader';
import PeriodResultsRow from './PeriodResultsRow';
import { getApiObjectsList } from '../../../app_infrastructure/services/APIService';
import { Stack, Typography } from '@mui/material';
import { WalletContext } from '../../../app_infrastructure/store/WalletContext';

/**
 * PeriodResultsTable component to display list of Period results for every Deposit
 */
export default function PeriodResultsTable({
  periodFilter,
  setPeriodResultsLoading,
}) {
  const { contextWalletId, refreshTimestamp } = useContext(WalletContext);
  const [periodResults, setPeriodResults] = useState([]);

  /**
   * Fetches Period results from API.
   */
  useEffect(() => {
    async function getPeriodResults() {
      const depositsPeriodResultsResponse = await getApiObjectsList(
        `${process.env.REACT_APP_BACKEND_URL}/api/wallets/${contextWalletId}/deposits_predictions_results/${periodFilter}/`
      );
      setPeriodResults(depositsPeriodResultsResponse);
      setPeriodResultsLoading(false);
    }
    if (!contextWalletId || !periodFilter) {
      return;
    }
    setPeriodResultsLoading(true);
    getPeriodResults();
  }, [periodFilter, refreshTimestamp]);

  if (periodResults.length <= 0) {
    return (
      <Stack
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        mt={2}
        mb={1}
      >
        <Typography color="primary" fontWeight="bold">
          No Period results to display.
        </Typography>
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <PeriodResultsHeader />
        </TableHead>
        <TableBody>
          {periodResults.map((row) => (
            <PeriodResultsRow key={row.user_username} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
