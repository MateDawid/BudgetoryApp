import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { WalletContext } from '../../app_infrastructure/store/WalletContext';
import { getApiObjectsList } from '../../app_infrastructure/services/APIService';
import FilterField from '../../app_infrastructure/components/FilterField';
import { AlertContext } from '../../app_infrastructure/store/AlertContext';
import CopyPreviousPredictionsButton from '../components/CopyPreviousPredictionsButton';
import PeriodFilterField from '../components/PeriodFilterField';
import ExpensePredictionTable from '../components/ExpensePredictionTable/ExpensePredictionTable';
import PeriodResultsTable from '../components/PeriodResultsTable/PeriodResultsTable';
import PredictionAddModal from '../components/PredictionModal/PredictionAddModal';
import StyledButton from '../../app_infrastructure/components/StyledButton';
import AddIcon from '@mui/icons-material/Add';
import PeriodStatuses from '../../periods/utils/PeriodStatuses';
import { useNavigate } from 'react-router-dom';
import InfoDialog from '../../app_infrastructure/components/InfoDialog';

const INFO_DIALOG_DATA = {
  title: 'What is a Prediction?',
  content: (
    <Typography>
      A Prediction is your planned spending budget for a specific Category
      within a Period. Set how much you plan to spend, then track your actual
      expenses against that budget to monitor your progress and see how much you
      have left.
    </Typography>
  ),
};

/**
 * ExpensePredictionsPage component to display list of ExpensePredictions
 */
export default function ExpensePredictionsPage() {
  const navigate = useNavigate();
  const { contextWalletId, refreshTimestamp } = useContext(WalletContext);
  const { setAlert } = useContext(AlertContext);
  const [periodResultsLoading, setPeriodResultsLoading] = useState(false);
  const [predictionsLoading, setPredictionsLoading] = useState(false);
  const [infoDialogOpened, setInfoDialogOpened] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [periods, setPeriods] = useState([]);
  const [periodFilter, setPeriodFilter] = useState('');
  const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/wallets/${contextWalletId}/expense_predictions/`;
  // Data
  const [periodStatus, setPeriodStatus] = useState(0);
  const [periodStatusLabel, setPeriodStatusLabel] = useState(null);

  /**
   * Fetches select options for ExpensePrediction select fields from API.
   */
  useEffect(() => {
    async function getPeriodsChoices() {
      try {
        const response = await getApiObjectsList(
          `${process.env.REACT_APP_BACKEND_URL}/api/wallets/${contextWalletId}/periods/?ordering=-date_start&fields=id,name,label,status,status_display`
        );
        setPeriods(response);
      } catch {
        setPeriods([]);
      }
    }

    if (!contextWalletId) {
      navigate('/wallets');
      setAlert({
        type: 'warning',
        message: 'Predictions are unavailable. Please create a Wallet first.',
      });
      return;
    }
    setPeriodFilter('');
    getPeriodsChoices();
  }, [contextWalletId]);

  // if (periodResultsLoading) {
  //   return (
  //     <Box display="flex" justifyContent="center">
  //       <CircularProgress size="3rem" />
  //     </Box>
  //   );
  // }

  // Prediction section establishing
  let predictionSectionContent = (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
      mt={2}
      mb={1}
    >
      <Typography color="primary" fontWeight="bold">
        Period not selected.
      </Typography>
    </Stack>
  );
  return (
    <>
      <Paper
        elevation={24}
        sx={{
          padding: 2,
          bgColor: '#F1F1F1',
        }}
      >
        {/* Main header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          mb={1}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={1}
            mb={1}
          >
            <Typography
              variant="h4"
              sx={{ display: 'block', color: '#BD0000' }}
            >
              Predictions
            </Typography>
            <InfoDialog
              dialogOpened={infoDialogOpened}
              setDialogOpened={setInfoDialogOpened}
              dialogTitle={INFO_DIALOG_DATA.title}
              dialogContent={INFO_DIALOG_DATA.content}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            {periodStatusLabel && (
              <Chip label={periodStatusLabel} variant="outlined" />
            )}
            <PeriodFilterField
              periodOptions={periods}
              periodFilter={periodFilter || ''}
              setPeriodFilter={setPeriodFilter}
              setPeriodStatus={setPeriodStatus}
              setPeriodStatusLabel={setPeriodStatusLabel}
            />
          </Stack>
        </Stack>
        <Divider />
        {!periodFilter ? (
          <Stack
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            mt={2}
            mb={1}
          >
            <Typography color="primary" fontWeight="bold">
              Period not selected.
            </Typography>
          </Stack>
        ) : (
          <>
            {/* Users summaries */}
            <Box sx={{ marginTop: 2 }}>
              <Typography
                variant="h5"
                sx={{ display: 'block', color: '#BD0000' }}
              >
                Period results
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <PeriodResultsTable
                periodFilter={periodFilter}
                setPeriodResultsLoading={setPeriodResultsLoading}
              />
            </Box>
            {/* Predictions objects */}
            <Box sx={{ marginTop: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
                mt={2}
                mb={1}
              >
                <Typography
                  variant="h5"
                  sx={{ display: 'block', color: '#BD0000' }}
                >
                  Predictions
                </Typography>
                <StyledButton
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setAddFormOpen(true)}
                  disabled={!periodFilter}
                >
                  Add
                </StyledButton>
              </Stack>
              <Divider sx={{ mb: 1 }} />
              <ExpensePredictionTable
                periodFilter={periodFilter}
                periodStatus={periodStatus}
                setPredictionsLoading={setPredictionsLoading}
                periodsCount={periods.length}
              />
            </Box>
          </>
        )}
      </Paper>
      <PredictionAddModal
        apiUrl={apiUrl}
        formOpen={addFormOpen}
        setFormOpen={setAddFormOpen}
        periodId={periodFilter}
      />
    </>
  );
}
