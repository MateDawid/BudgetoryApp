import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import React, { useContext, useEffect, useState } from 'react';
import DraftPeriodPredictionRow from './DraftPeriodPredictionRow';
import DraftPeriodPredictionHeader from './DraftPeriodPredictionHeader';
import ActivePeriodPredictionHeader from './ActivePeriodPredictionHeader';
import ActivePeriodPredictionRow from './ActivePeriodPredictionRow';
import ClosedPeriodPredictionHeader from './ClosedPeriodPredictionHeader';
import ClosedPeriodPredictionRow from './ClosedPeriodPredictionRow';
import PeriodStatuses from '../../../periods/utils/PeriodStatuses';
import { WalletContext } from '../../../app_infrastructure/store/WalletContext';
import { getApiObjectsList } from '../../../app_infrastructure/services/APIService';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../../app_infrastructure/store/AlertContext';
import { Box, Stack, Typography } from '@mui/material';
import FilterField from '../../../app_infrastructure/components/FilterField';
import CopyPreviousPredictionsButton from '../CopyPreviousPredictionsButton';

const UNCATEGORIZED_PRIORITY = -1;

const baseOrderingOptions = [
  { value: 'category__name', label: 'Category name ↗' },
  { value: '-category__name', label: 'Category name ↘' },
  { value: 'category__priority', label: 'Category priority ↘' },
  { value: '-category__priority', label: 'Category priority ↗' },
  { value: 'current_plan', label: 'Current plan ↗' },
  { value: '-current_plan', label: 'Current plan ↘' },
  { value: 'current_result', label: 'Current result ↗' },
  { value: '-current_result', label: 'Current result ↘' },
  { value: 'current_funds_left', label: 'Funds left ↗' },
  { value: '-current_funds_left', label: 'Funds left ↘' },
  { value: 'current_progress', label: 'Progress ↗' },
  { value: '-current_progress', label: 'Progress ↘' },
];

const draftPeriodOrderingOptions = [
  { value: 'previous_result', label: 'Previous result ↗' },
  { value: '-previous_result', label: 'Previous result ↘' },
  { value: 'previous_funds_left', label: 'Previous funds left ↗' },
  { value: '-previous_funds_left', label: 'Previous funds left ↘' },
];

export default function ExpensePredictionTable({
  periodFilter,
  periodStatus,
  setPredictionsLoading,
  periodsCount,
}) {
  const navigate = useNavigate();
  const { contextWalletId, refreshTimestamp } = useContext(WalletContext);
  const { setAlert } = useContext(AlertContext);
  const [predictions, setPredictions] = useState([]);

  // Urls
  const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/wallets/${contextWalletId}/expense_predictions/`;
  const copyPredictionsUrl = `${process.env.REACT_APP_BACKEND_URL}/api/wallets/${contextWalletId}/copy_predictions_from_previous_period/`;

  // Selectors choices
  const [deposits, setDeposits] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [progressStatuses, setProgressStatuses] = useState([]);

  // Filters
  const [depositFilter, setDepositFilter] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [progressStatusFilter, setProgressStatusFilter] = useState(null);
  const [orderingFilter, setOrderingFilter] = useState('category__priority');

  useEffect(() => {
    async function getPriorities() {
      const priorityResponse = await getApiObjectsList(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories/priorities/?type=2`
      );
      setPriorities([
        { value: UNCATEGORIZED_PRIORITY, label: '❗Not categorized' },
        ...priorityResponse.results,
      ]);
    }

    async function getProgressStatuses() {
      const progressStatusResponse = await getApiObjectsList(
        `${process.env.REACT_APP_BACKEND_URL}/api/predictions/progress_statuses/`
      );
      setProgressStatuses(progressStatusResponse);
    }
    getPriorities();
    getProgressStatuses();
  }, []);

  /**
   * Fetches select options for ExpensePrediction select fields from API.
   */
  useEffect(() => {
    async function getDeposits() {
      const depositsResponse = await getApiObjectsList(
        `${process.env.REACT_APP_BACKEND_URL}/api/wallets/${contextWalletId}/deposits/?ordering=name&fields=value,label`
      );
      setDeposits(depositsResponse);
    }

    if (!contextWalletId) {
      navigate('/wallets');
      setAlert({
        type: 'warning',
        message: 'Predictions are unavailable. Please create a Wallet first.',
      });
      return;
    }
    setDepositFilter(null);
    setCategoryFilter(null);
    getDeposits();
  }, [contextWalletId]);

  /**
   * Fetches select options for ExpensePrediction categories object from API.
   */
  useEffect(() => {
    async function getCategories() {
      const filterModel = {};
      if (depositFilter) {
        filterModel['deposit'] = depositFilter;
      }
      if (priorityFilter) {
        filterModel['priority'] = priorityFilter;
      }
      const categoryResponse = await getApiObjectsList(
        `${process.env.REACT_APP_BACKEND_URL}/api/wallets/${contextWalletId}/categories/?category_type=2`,
        {},
        {},
        filterModel
      );
      setCategories(categoryResponse);
      setCategoryFilter(null);
    }
    if (
      !contextWalletId ||
      (!priorityFilter && !depositFilter) ||
      priorityFilter === UNCATEGORIZED_PRIORITY
    ) {
      return;
    }
    getCategories();
  }, [depositFilter, priorityFilter]);

  /**
   * Fetches ExpensePrediction objects from API.
   */
  useEffect(() => {
    const getFilterModel = () => {
      const filterModel = {};
      const selectFilters = [
        { value: periodFilter, apiField: 'period' },
        { value: categoryFilter, apiField: 'category' },
        { value: depositFilter, apiField: 'deposit' },
        { value: progressStatusFilter, apiField: 'progress_status' },
        { value: priorityFilter, apiField: 'category_priority' },
        { value: orderingFilter, apiField: 'ordering' },
      ];
      selectFilters.forEach((object) => {
        if (object.value !== null) {
          filterModel[[object.apiField]] = object.value;
        }
      });

      return filterModel;
    };
    async function getPredictions() {
      const predictionsResponse = await getApiObjectsList(
        apiUrl,
        {},
        {},
        getFilterModel()
      );
      setPredictions(predictionsResponse);
      setPredictionsLoading(false);
    }
    if (!contextWalletId || !periodFilter) {
      setPredictions([]);
      setPredictionsLoading(false);
      return;
    }
    setPredictionsLoading(true);
    getPredictions();
  }, [
    refreshTimestamp,
    depositFilter,
    priorityFilter,
    categoryFilter,
    periodFilter,
    progressStatusFilter,
    orderingFilter,
  ]);

  let header = null;
  let rows = null;

  switch (periodStatus) {
    case PeriodStatuses.DRAFT: {
      header = <DraftPeriodPredictionHeader />;
      rows = predictions.map((row) => (
        <DraftPeriodPredictionRow key={row.id} row={row} />
      ));
      break;
    }
    case PeriodStatuses.ACTIVE: {
      header = <ActivePeriodPredictionHeader />;
      rows = predictions.map((row) => (
        <ActivePeriodPredictionRow key={row.id} row={row} />
      ));
      break;
    }
    case PeriodStatuses.CLOSED: {
      header = <ClosedPeriodPredictionHeader />;
      rows = predictions.map((row) => (
        <ClosedPeriodPredictionRow key={row.id} row={row} />
      ));
      break;
    }
  }

  if (periodFilter && predictions.length > 0)
    return (
      <Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1, mt: 1 }}>
          <FilterField
            filterValue={depositFilter}
            setFilterValue={setDepositFilter}
            options={deposits}
            label="Deposit"
            sx={{ width: { sm: '100%', md: 200 }, margin: 0 }}
          />
          <FilterField
            filterValue={priorityFilter}
            setFilterValue={setPriorityFilter}
            options={priorities}
            label="Category Priority"
            sx={{ width: { sm: '100%', md: 200 }, margin: 0 }}
          />
          <FilterField
            filterValue={categoryFilter}
            setFilterValue={setCategoryFilter}
            options={categories}
            label="Category"
            sx={{ width: { sm: '100%', md: 200 }, margin: 0 }}
            disabled={
              !depositFilter || priorityFilter === UNCATEGORIZED_PRIORITY
            }
            groupBy={(option) => option.priority_display}
            renderGroup={(params) => (
              <li key={params.key}>
                <div
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    padding: '8px 16px',
                    color: 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {params.group}
                </div>
                <ul style={{ padding: 0 }}>{params.children}</ul>
              </li>
            )}
          />
          <FilterField
            filterValue={progressStatusFilter}
            setFilterValue={setProgressStatusFilter}
            options={progressStatuses}
            label="Progress"
            sx={{ width: { sm: '100%', md: 200 }, margin: 0 }}
          />
          <FilterField
            filterValue={orderingFilter}
            setFilterValue={setOrderingFilter}
            options={
              periodStatus === PeriodStatuses.DRAFT
                ? [...baseOrderingOptions, ...draftPeriodOrderingOptions]
                : baseOrderingOptions
            }
            label="Sort by"
            disableClearable
            sx={{ width: { sm: '100%', md: 200 }, margin: 0 }}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>{header}</TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    );

  if (periodFilter && predictions.length <= 0)
    return (
      <Stack
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        mb={1}
      >
        <Typography color="primary" fontWeight="bold">
          No Predictions found.
        </Typography>
        {periodStatus === PeriodStatuses.DRAFT &&
          periodsCount > 1 &&
          !categoryFilter &&
          !depositFilter && (
            <CopyPreviousPredictionsButton
              periodId={periodFilter}
              apiUrl={copyPredictionsUrl}
              setAlert={setAlert}
            />
          )}
      </Stack>
    );
}
