import React, { act } from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ExpensePredictionsPage from './ExpensePredictionsPage';
import { WalletContext } from '../../app_infrastructure/store/WalletContext';
import { AlertContext } from '../../app_infrastructure/store/AlertContext';
import { getApiObjectsList } from '../../app_infrastructure/services/APIService';

// Mock the API service
jest.mock('../../app_infrastructure/services/APIService');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock child components that are self-contained units tested separately.
// Their props are verified here; their internal behaviour is not re-tested.

jest.mock('../components/PeriodFilterField', () => {
  return function MockPeriodFilterField({
    setPeriodFilter,
    setPeriodStatus,
    setPeriodStatusLabel,
  }) {
    return (
      <div data-testid="period-filter-field">
        <button
          onClick={() => {
            setPeriodFilter('period-1');
            setPeriodStatus(0); // DRAFT status
            setPeriodStatusLabel('Draft');
          }}
        >
          Select Period
        </button>
      </div>
    );
  };
});

// ExpensePredictionTable owns its own filters, data fetching, and empty states.
// Capture the props passed to it so we can assert on them.
let capturedPredictionTableProps = {};
jest.mock('../components/ExpensePredictionTable/ExpensePredictionTable', () => {
  return function MockExpensePredictionTable(props) {
    capturedPredictionTableProps = props;
    return <div data-testid="expense-prediction-table" />;
  };
});

// PeriodResultsTable owns its own data fetching and empty states.
// Capture the props passed to it so we can assert on them.
let capturedResultsTableProps = {};
jest.mock('../components/PeriodResultsTable/PeriodResultsTable', () => {
  return function MockPeriodResultsTable(props) {
    capturedResultsTableProps = props;
    return <div data-testid="period-results-table" />;
  };
});

jest.mock('../components/PredictionModal/PredictionAddModal', () => {
  return function MockPredictionAddModal({ formOpen, setFormOpen }) {
    return formOpen ? (
      <div data-testid="prediction-add-modal">
        <button onClick={() => setFormOpen(false)}>Close Modal</button>
      </div>
    ) : null;
  };
});

jest.mock('../../app_infrastructure/components/StyledButton', () => {
  return function MockStyledButton({ children, onClick, disabled }) {
    return (
      <button onClick={onClick} disabled={disabled} data-testid="styled-button">
        {children}
      </button>
    );
  };
});

jest.mock('../../app_infrastructure/components/InfoDialog', () => {
  return function MockInfoDialog() {
    return <div data-testid="info-dialog" />;
  };
});

// ---------------------------------------------------------------------------

describe('ExpensePredictionsPage', () => {
  const mockSetAlert = jest.fn();
  let mockRefreshTimestamp;
  let defaultWalletContext;
  let defaultAlertContext;

  const mockPeriods = [
    {
      id: 'period-1',
      name: 'January 2024',
      label: 'January 2024',
      status: 0,
      status_display: 'Draft',
    },
    {
      id: 'period-2',
      name: 'February 2024',
      label: 'February 2024',
      status: 0,
      status_display: 'Draft',
    },
  ];

  const renderComponent = (
    walletContext = defaultWalletContext,
    alertContext = defaultAlertContext
  ) => {
    return render(
      <MemoryRouter>
        <WalletContext.Provider value={walletContext}>
          <AlertContext.Provider value={alertContext}>
            <ExpensePredictionsPage />
          </AlertContext.Provider>
        </WalletContext.Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    capturedPredictionTableProps = {};
    capturedResultsTableProps = {};
    process.env.REACT_APP_BACKEND_URL = 'http://localhost:8000';

    mockRefreshTimestamp = Date.now();

    defaultWalletContext = {
      contextWalletId: 'wallet-123',
      refreshTimestamp: mockRefreshTimestamp,
    };

    defaultAlertContext = {
      setAlert: mockSetAlert,
    };

    getApiObjectsList.mockResolvedValue(mockPeriods);
  });

  // -------------------------------------------------------------------------
  describe('Initial Rendering', () => {
    test('renders main h4 header', async () => {
      await act(async () => {
        renderComponent();
      });

      const headers = screen.getAllByText('Predictions');
      const h4 = headers.find((el) => el.tagName === 'H4');
      expect(h4).toBeInTheDocument();
    });

    test('renders "Period results" section header after period is selected', async () => {
      await act(async () => {
        renderComponent();
      });
      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });
      expect(screen.getByText('Period results')).toBeInTheDocument();
    });

    test('renders "Predictions" h5 section header after period is selected', async () => {
      await act(async () => {
        renderComponent();
      });
      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });
      const headers = screen.getAllByText('Predictions');
      const h5 = headers.find((el) => el.tagName === 'H5');
      expect(h5).toBeInTheDocument();
    });

    test('shows "Period not selected." message when no period chosen', async () => {
      await act(async () => {
        renderComponent();
      });
      // The message appears in both the Period results area and the Predictions area
      const messages = screen.getAllByText('Period not selected.');
      expect(messages.length).toBeGreaterThanOrEqual(1);
    });

    test('renders PeriodFilterField', async () => {
      await act(async () => {
        renderComponent();
      });
      expect(screen.getByTestId('period-filter-field')).toBeInTheDocument();
    });

    test('does not render ExpensePredictionTable before a period is selected', async () => {
      await act(async () => {
        renderComponent();
      });
      expect(
        screen.queryByTestId('expense-prediction-table')
      ).not.toBeInTheDocument();
    });

    test('does not render PeriodResultsTable before a period is selected', async () => {
      await act(async () => {
        renderComponent();
      });
      expect(
        screen.queryByTestId('period-results-table')
      ).not.toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  describe('Data Fetching on Mount', () => {
    test('fetches periods list on mount', async () => {
      renderComponent();

      await waitFor(() => {
        expect(getApiObjectsList).toHaveBeenCalledWith(
          expect.stringContaining('/api/wallets/wallet-123/periods/')
        );
      });
    });

    test('navigates to /wallets when contextWalletId is null', async () => {
      renderComponent({
        contextWalletId: null,
        refreshTimestamp: mockRefreshTimestamp,
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/wallets');
        expect(mockSetAlert).toHaveBeenCalledWith({
          type: 'warning',
          message: 'Predictions are unavailable. Please create a Wallet first.',
        });
      });
    });

    test('does not call getApiObjectsList when wallet is missing', async () => {
      renderComponent({
        contextWalletId: null,
        refreshTimestamp: mockRefreshTimestamp,
      });

      await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
      // periods endpoint must not be called
      const periodsCalls = getApiObjectsList.mock.calls.filter((args) =>
        args[0].includes('/periods/')
      );
      expect(periodsCalls).toHaveLength(0);
    });

    test('handles API errors for periods gracefully (no crash)', async () => {
      getApiObjectsList.mockRejectedValue(new Error('Network Error'));

      await expect(
        act(async () => {
          renderComponent();
        })
      ).resolves.not.toThrow();

      // Page header should still render
      const headers = screen.getAllByText('Predictions');
      expect(headers.find((el) => el.tagName === 'H4')).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  describe('Period Selection', () => {
    test('renders ExpensePredictionTable after a period is selected', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      expect(
        screen.getByTestId('expense-prediction-table')
      ).toBeInTheDocument();
    });

    test('renders PeriodResultsTable after a period is selected', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      expect(screen.getByTestId('period-results-table')).toBeInTheDocument();
    });

    test('passes correct periodFilter prop to ExpensePredictionTable', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      expect(capturedPredictionTableProps.periodFilter).toBe('period-1');
    });

    test('passes correct periodFilter prop to PeriodResultsTable', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      expect(capturedResultsTableProps.periodFilter).toBe('period-1');
    });

    test('passes correct periodStatus prop to ExpensePredictionTable', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      // MockPeriodFilterField sets status 0 (DRAFT)
      expect(capturedPredictionTableProps.periodStatus).toBe(0);
    });

    test('passes periodsCount (total periods fetched) to ExpensePredictionTable', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      expect(capturedPredictionTableProps.periodsCount).toBe(
        mockPeriods.length
      );
    });

    test('displays period status chip after period selection', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      expect(screen.getByText('Draft')).toBeInTheDocument();
    });

    test('hides "Period not selected." message after period is chosen', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      expect(
        screen.queryByText('Period not selected.')
      ).not.toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  describe('Add Prediction Button', () => {
    test('Add button is present after a period is selected', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      expect(screen.getByText('Add')).toBeInTheDocument();
    });

    test('Add button is not rendered before a period is selected', async () => {
      await act(async () => {
        renderComponent();
      });

      // The Add button lives inside the period-selected branch, so it should be absent
      expect(screen.queryByText('Add')).not.toBeInTheDocument();
    });

    test('clicking Add button opens PredictionAddModal', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Add'));
      });

      expect(screen.getByTestId('prediction-add-modal')).toBeInTheDocument();
    });

    test('closing modal hides PredictionAddModal', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Add'));
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Close Modal'));
      });

      expect(
        screen.queryByTestId('prediction-add-modal')
      ).not.toBeInTheDocument();
    });

    test('PredictionAddModal renders when period is selected and Add is clicked', async () => {
      // Verifies indirectly that periodId is truthy: the mock only renders
      // when formOpen=true, which requires a period to be set first.
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Add'));
      });

      expect(screen.getByTestId('prediction-add-modal')).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  describe('Loading State', () => {
    test('setPeriodResultsLoading callback is passed to PeriodResultsTable', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      expect(typeof capturedResultsTableProps.setPeriodResultsLoading).toBe(
        'function'
      );
    });

    test('setPredictionsLoading callback is passed to ExpensePredictionTable', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      expect(typeof capturedPredictionTableProps.setPredictionsLoading).toBe(
        'function'
      );
    });

    test('loading overlay appears when setPeriodResultsLoading(true) is called', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      act(() => {
        capturedResultsTableProps.setPeriodResultsLoading(true);
      });

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('loading overlay disappears when both loading flags are false', async () => {
      await act(async () => {
        renderComponent();
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });

      // Turn on both loaders
      act(() => {
        capturedResultsTableProps.setPeriodResultsLoading(true);
        capturedPredictionTableProps.setPredictionsLoading(true);
      });

      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      // Turn off both loaders
      act(() => {
        capturedResultsTableProps.setPeriodResultsLoading(false);
        capturedPredictionTableProps.setPredictionsLoading(false);
      });

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  describe('Wallet Context Change', () => {
    test('resets period filter when contextWalletId changes', async () => {
      const { rerender } = render(
        <MemoryRouter>
          <WalletContext.Provider value={defaultWalletContext}>
            <AlertContext.Provider value={defaultAlertContext}>
              <ExpensePredictionsPage />
            </AlertContext.Provider>
          </WalletContext.Provider>
        </MemoryRouter>
      );

      // Select a period
      await act(async () => {
        fireEvent.click(screen.getByText('Select Period'));
      });
      expect(
        screen.getByTestId('expense-prediction-table')
      ).toBeInTheDocument();

      // Switch wallet
      await act(async () => {
        rerender(
          <MemoryRouter>
            <WalletContext.Provider
              value={{
                contextWalletId: 'wallet-456',
                refreshTimestamp: mockRefreshTimestamp,
              }}
            >
              <AlertContext.Provider value={defaultAlertContext}>
                <ExpensePredictionsPage />
              </AlertContext.Provider>
            </WalletContext.Provider>
          </MemoryRouter>
        );
      });

      // Period should be reset – tables disappear, "not selected" message returns
      expect(
        screen.queryByTestId('expense-prediction-table')
      ).not.toBeInTheDocument();
    });

    test('re-fetches periods when contextWalletId changes', async () => {
      const { rerender } = render(
        <MemoryRouter>
          <WalletContext.Provider value={defaultWalletContext}>
            <AlertContext.Provider value={defaultAlertContext}>
              <ExpensePredictionsPage />
            </AlertContext.Provider>
          </WalletContext.Provider>
        </MemoryRouter>
      );

      await waitFor(() =>
        expect(getApiObjectsList).toHaveBeenCalledWith(
          expect.stringContaining('/api/wallets/wallet-123/periods/')
        )
      );

      const callsBefore = getApiObjectsList.mock.calls.length;

      await act(async () => {
        rerender(
          <MemoryRouter>
            <WalletContext.Provider
              value={{
                contextWalletId: 'wallet-456',
                refreshTimestamp: mockRefreshTimestamp,
              }}
            >
              <AlertContext.Provider value={defaultAlertContext}>
                <ExpensePredictionsPage />
              </AlertContext.Provider>
            </WalletContext.Provider>
          </MemoryRouter>
        );
      });

      await waitFor(() => {
        expect(getApiObjectsList.mock.calls.length).toBeGreaterThan(
          callsBefore
        );
        expect(getApiObjectsList).toHaveBeenCalledWith(
          expect.stringContaining('/api/wallets/wallet-456/periods/')
        );
      });
    });
  });
});
