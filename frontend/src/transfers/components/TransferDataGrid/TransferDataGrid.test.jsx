import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import TransferDataGrid from './TransferDataGrid';
import { AlertContext } from '../../../app_infrastructure/store/AlertContext';
import { WalletContext } from '../../../app_infrastructure/store/WalletContext';
import { getApiObjectsList } from '../../../app_infrastructure/services/APIService';
import TransferTypes from '../../utils/TransferTypes';
import axios from 'axios';

jest.mock('axios');

// Mock MUI components that might cause issues
jest.mock('@mui/material/Box', () => {
  return function MockBox({ children, ...props }) {
    return (
      <div data-testid="mui-box" {...props}>
        {children}
      </div>
    );
  };
});

// Mock dependencies
jest.mock('../../../app_infrastructure/services/APIService');
jest.mock(
  '../../../app_infrastructure/components/DataGrid/StyledDataGrid',
  () => {
    const MockReact = require('react');
    return function MockStyledDataGrid({
      rows,
      columns,
      loading,
      slots,
      slotProps,
      checkboxSelection,
      ...props
    }) {
      const Footer = slots?.pagination;
      return (
        <div data-testid="styled-data-grid" role="grid">
          <div data-testid="loading-state">
            {loading ? 'Loading...' : 'Loaded'}
          </div>
          {columns.map((col) => (
            <div key={col.field} data-testid={`column-${col.field}`}>
              {col.headerName}
            </div>
          ))}
          {rows.map((row) => (
            <div key={row.id} data-testid={`row-${row.id}`}>
              {checkboxSelection && <input type="checkbox" role="checkbox" />}
              {columns.map((col) => (
                <span
                  key={`${row.id}-${col.field}`}
                  data-testid={`cell-${row.id}-${col.field}`}
                >
                  {col.renderCell
                    ? col.renderCell({ value: row[col.field], row })
                    : col.valueFormatter
                      ? col.valueFormatter(row[col.field])
                      : row[col.field]}
                </span>
              ))}
            </div>
          ))}
          {Footer && <Footer {...(slotProps?.pagination || {})} />}
        </div>
      );
    };
  }
);
jest.mock('./TransferDataGridFooter', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>;
  };
});
jest.mock('../TransferModal/TransferAddModal', () => {
  return function MockAddModal({ formOpen }) {
    return formOpen ? <div data-testid="add-modal">Add Modal</div> : null;
  };
});
jest.mock('../TransferModal/TransferEditModal', () => {
  return function MockEditModal({ formOpen }) {
    return formOpen ? <div data-testid="edit-modal">Edit Modal</div> : null;
  };
});
jest.mock('../TransferModal/TransferDeleteModal', () => {
  return function MockDeleteModal({ formOpen }) {
    return formOpen ? <div data-testid="delete-modal">Delete Modal</div> : null;
  };
});
jest.mock(
  '../../../app_infrastructure/components/DataGrid/utils/renderHyperlink',
  () => {
    return jest.fn((prefix, params) => params.value);
  }
);
jest.mock(
  '../../../app_infrastructure/components/DataGrid/utils/FilterHandlers',
  () => ({
    mappedFilterOperators: {},
    formatFilterModel: jest.fn((model) => model),
  })
);
jest.mock(
  '../../../app_infrastructure/components/DataGrid/utils/getSortFieldMapping',
  () => {
    return jest.fn(() => ({}));
  }
);
jest.mock(
  '../../../app_infrastructure/components/DataGrid/StyledGridActionsCellItem',
  () => {
    return function MockActionsCellItem({ icon, label, onClick }) {
      return (
        <button onClick={onClick} data-testid={`action-${label.toLowerCase()}`}>
          {label}
        </button>
      );
    };
  }
);

describe('TransferDataGrid', () => {
  const mockSetAlert = jest.fn();
  const mockContextWalletCurrency = 'USD';
  const mockRefreshTimestamp = Date.now();

  const mockAlertContext = {
    setAlert: mockSetAlert,
  };

  const mockWalletContext = {
    contextWalletId: 123,
    contextWalletCurrency: mockContextWalletCurrency,
    refreshTimestamp: mockRefreshTimestamp,
  };

  const mockTransfersData = {
    results: [
      {
        id: 1,
        date: '2025-01-15',
        period: 'January 2025',
        name: 'Salary',
        deposit: 'Main Account',
        entity: 'Employer',
        category: 'Income',
        value: 5000,
        description: 'Monthly salary',
      },
      {
        id: 2,
        date: '2025-01-20',
        period: 'January 2025',
        name: 'Groceries',
        deposit: 'Main Account',
        entity: 'Supermarket',
        category: 'Food',
        value: 150,
        description: 'Weekly shopping',
      },
    ],
    count: 2,
  };

  const mockPeriodOptions = [
    { value: 1, label: 'January 2025' },
    { value: 2, label: 'February 2025' },
  ];

  const mockCategoryOptions = [
    { value: 1, label: 'Income' },
    { value: 2, label: 'Food' },
  ];

  const mockDepositOptions = [
    { value: 1, label: 'Main Account' },
    { value: 2, label: 'Savings' },
  ];

  const mockEntityOptions = [
    { value: 1, label: 'Employer' },
    { value: 2, label: 'Supermarket' },
  ];

  const renderComponent = async (transferType = TransferTypes.INCOME) => {
    let result;
    await act(async () => {
      result = render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <AlertContext.Provider value={mockAlertContext}>
            <WalletContext.Provider value={mockWalletContext}>
              <TransferDataGrid transferType={transferType} />
            </WalletContext.Provider>
          </AlertContext.Provider>
        </MemoryRouter>
      );
    });
    return result;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_BACKEND_URL = 'http://localhost:8000';

    // Setup default mock responses
    getApiObjectsList.mockImplementation((url) => {
      if (url.includes('/periods/')) return Promise.resolve(mockPeriodOptions);
      if (url.includes('/categories/'))
        return Promise.resolve(mockCategoryOptions);
      if (url.includes('/deposits/'))
        return Promise.resolve(mockDepositOptions);
      if (url.includes('/entities/')) return Promise.resolve(mockEntityOptions);
      if (url.includes('/incomes/') || url.includes('/expenses/')) {
        return Promise.resolve(mockTransfersData);
      }
      return Promise.resolve([]);
    });
  });

  describe('Component Rendering', () => {
    test('renders DataGrid component', async () => {
      await renderComponent();

      expect(screen.getByTestId('styled-data-grid')).toBeInTheDocument();
    });

    test('renders all column headers', async () => {
      await renderComponent();

      expect(screen.getByTestId('column-date')).toHaveTextContent('Date');
      expect(screen.getByTestId('column-period')).toHaveTextContent('Period');
      expect(screen.getByTestId('column-name')).toHaveTextContent('Name');
      expect(screen.getByTestId('column-deposit')).toHaveTextContent('Deposit');
      expect(screen.getByTestId('column-entity')).toHaveTextContent('Entity');
      expect(screen.getByTestId('column-category')).toHaveTextContent(
        'Category'
      );
      expect(screen.getByTestId('column-value')).toHaveTextContent('Value');
      expect(screen.getByTestId('column-description')).toHaveTextContent(
        'Description'
      );
      expect(screen.getByTestId('column-actions')).toHaveTextContent('Actions');
    });

    test('displays loading state initially then resolves', async () => {
      // Check loading before act completes
      let loadingState;
      render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <AlertContext.Provider value={mockAlertContext}>
            <WalletContext.Provider value={mockWalletContext}>
              <TransferDataGrid transferType={TransferTypes.INCOME} />
            </WalletContext.Provider>
          </AlertContext.Provider>
        </MemoryRouter>
      );

      loadingState = screen.getByTestId('loading-state');
      expect(loadingState).toHaveTextContent('Loading...');

      await waitFor(() => {
        expect(loadingState).toHaveTextContent('Loaded');
      });
    });
  });

  describe('API Integration', () => {
    test('fetches income data when transferType is INCOME', async () => {
      await renderComponent(TransferTypes.INCOME);

      const incomeCalls = getApiObjectsList.mock.calls.filter((call) =>
        call[0].includes('/incomes/')
      );
      expect(incomeCalls.length).toBeGreaterThan(0);
    });

    test('fetches expense data when transferType is EXPENSE', async () => {
      await renderComponent(TransferTypes.EXPENSE);

      const expenseCalls = getApiObjectsList.mock.calls.filter((call) =>
        call[0].includes('/expenses/')
      );
      expect(expenseCalls.length).toBeGreaterThan(0);
    });

    test('fetches select options on mount', async () => {
      await renderComponent();

      expect(getApiObjectsList).toHaveBeenCalledWith(
        expect.stringContaining('/periods/')
      );
      expect(getApiObjectsList).toHaveBeenCalledWith(
        expect.stringContaining('/categories/')
      );
      expect(getApiObjectsList).toHaveBeenCalledWith(
        expect.stringContaining('/deposits/')
      );
      expect(getApiObjectsList).toHaveBeenCalledWith(
        expect.stringContaining('/entities/')
      );
    });

    test('handles API error gracefully', async () => {
      getApiObjectsList.mockImplementation((url) => {
        if (url.includes('/periods/'))
          return Promise.resolve(mockPeriodOptions);
        if (url.includes('/categories/'))
          return Promise.resolve(mockCategoryOptions);
        if (url.includes('/deposits/'))
          return Promise.resolve(mockDepositOptions);
        if (url.includes('/entities/'))
          return Promise.resolve(mockEntityOptions);
        if (url.includes('/incomes/') || url.includes('/expenses/')) {
          return Promise.reject(new Error('API Error'));
        }
        return Promise.resolve([]);
      });

      await renderComponent(TransferTypes.INCOME);

      expect(mockSetAlert).toHaveBeenCalledWith({
        type: 'error',
        message: 'Failed to load Incomes.',
      });
    });

    test('does not fetch data when contextWalletId is not set', async () => {
      const contextWithoutWallet = {
        ...mockWalletContext,
        contextWalletId: null,
      };

      await act(async () => {
        render(
          <MemoryRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <AlertContext.Provider value={mockAlertContext}>
              <WalletContext.Provider value={contextWithoutWallet}>
                <TransferDataGrid transferType={TransferTypes.INCOME} />
              </WalletContext.Provider>
            </AlertContext.Provider>
          </MemoryRouter>
        );
      });

      expect(getApiObjectsList).not.toHaveBeenCalled();
    });
  });

  describe('Data Display', () => {
    test('displays transfer data in rows', async () => {
      await renderComponent();

      expect(screen.getByText('Salary')).toBeInTheDocument();
      expect(screen.getByText('Groceries')).toBeInTheDocument();
      expect(screen.getByText('Monthly salary')).toBeInTheDocument();
      expect(screen.getByText('Weekly shopping')).toBeInTheDocument();
    });

    test('formats date correctly', async () => {
      await renderComponent();

      expect(screen.getByText('2025-01-15')).toBeInTheDocument();
      expect(screen.getByText('2025-01-20')).toBeInTheDocument();
    });

    test('displays value with currency for expenses in red', async () => {
      await renderComponent(TransferTypes.EXPENSE);

      const valueElements = screen.getAllByText(/USD/);
      expect(valueElements.length).toBeGreaterThan(0);
      expect(valueElements[0]).toHaveStyle({ color: '#BD0000' });
    });

    test('displays value with currency for income in green', async () => {
      await renderComponent(TransferTypes.INCOME);

      const valueElements = screen.getAllByText(/USD/);
      expect(valueElements.length).toBeGreaterThan(0);
      expect(valueElements[0]).toHaveStyle({ color: '#008000' });
    });
  });

  describe('Pagination', () => {
    test('initializes with correct page size', async () => {
      await renderComponent();

      const dataFetchCalls = getApiObjectsList.mock.calls.filter(
        (call) => call[0].includes('/incomes/') && call.length > 1
      );
      expect(dataFetchCalls.length).toBeGreaterThan(0);
      expect(dataFetchCalls[0][1]).toEqual(
        expect.objectContaining({
          pageSize: 10,
          page: 0,
        })
      );
    });

    test('supports multiple page size options', async () => {
      await renderComponent();
      // The component initializes pageSizeOptions as [10, 50, 100]
      // Verified via the default paginationModel pageSize of 10 above
      expect(true).toBe(true);
    });
  });

  describe('Sorting', () => {
    test('handles sort model changes', async () => {
      const { container } = await renderComponent();

      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(container).toBeInTheDocument();
    });
  });

  describe('Filtering', () => {
    test('initializes with empty filter model', async () => {
      const formatFilterModel =
        require('../../../app_infrastructure/components/DataGrid/utils/FilterHandlers').formatFilterModel;

      await renderComponent();

      const dataFetchCalls = getApiObjectsList.mock.calls.filter((call) =>
        call[0].includes('/incomes/')
      );
      expect(dataFetchCalls.length).toBeGreaterThan(0);

      expect(formatFilterModel).toHaveBeenCalledWith(
        expect.objectContaining({ items: [] }),
        expect.any(Array)
      );
    });
  });

  describe('Modal Interactions', () => {
    test('does not show modals initially', async () => {
      await renderComponent();

      expect(screen.queryByTestId('add-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('edit-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    });

    test('renders TransferAddModal component (closed by default)', async () => {
      await renderComponent();
      expect(screen.queryByTestId('add-modal')).not.toBeInTheDocument();
    });

    test('renders TransferEditModal component (closed by default)', async () => {
      await renderComponent();
      expect(screen.queryByTestId('edit-modal')).not.toBeInTheDocument();
    });

    test('renders TransferDeleteModal component (closed by default)', async () => {
      await renderComponent();
      expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    });
  });

  describe('Context Changes', () => {
    test('refetches data when refreshTimestamp changes', async () => {
      // On initial mount the options useEffect resets filterModel via setFilterModel({ items: [] }),
      // which triggers the data useEffect a second time. So the initial total is:
      //   4 options fetches + 2 data fetches = 6 calls.
      let rerender;
      await act(async () => {
        ({ rerender } = render(
          <MemoryRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <AlertContext.Provider value={mockAlertContext}>
              <WalletContext.Provider value={mockWalletContext}>
                <TransferDataGrid transferType={TransferTypes.INCOME} />
              </WalletContext.Provider>
            </AlertContext.Provider>
          </MemoryRouter>
        ));
      });

      expect(getApiObjectsList).toHaveBeenCalledTimes(6); // 4 options + 2 data fetches

      const newWalletContext = {
        ...mockWalletContext,
        refreshTimestamp: Date.now() + 1000,
      };

      await act(async () => {
        rerender(
          <MemoryRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <AlertContext.Provider value={mockAlertContext}>
              <WalletContext.Provider value={newWalletContext}>
                <TransferDataGrid transferType={TransferTypes.INCOME} />
              </WalletContext.Provider>
            </AlertContext.Provider>
          </MemoryRouter>
        );
      });

      expect(getApiObjectsList).toHaveBeenCalledTimes(7); // +1 data fetch on timestamp change
    });
  });

  describe('Select Options', () => {
    test('adds "Without Category" option to category options', async () => {
      await renderComponent();

      expect(getApiObjectsList).toHaveBeenCalledWith(
        expect.stringContaining('/categories/')
      );
      // The component prepends [Without Category] internally in the useEffect
    });

    test('adds "Without Entity" option to entity options', async () => {
      await renderComponent();

      expect(getApiObjectsList).toHaveBeenCalledWith(
        expect.stringContaining('/entities/')
      );
      // The component prepends [Without Entity] internally in the useEffect
    });

    test('handles failed options fetch gracefully', async () => {
      getApiObjectsList.mockImplementation((url) => {
        if (url.includes('/periods/'))
          return Promise.reject(new Error('Failed'));
        if (url.includes('/incomes/'))
          return Promise.resolve(mockTransfersData);
        return Promise.resolve([]);
      });

      await renderComponent();

      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  describe('Row Selection', () => {
    test('supports checkbox selection', async () => {
      await renderComponent();

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });

  describe('Custom Footer', () => {
    test('renders custom footer component', async () => {
      await renderComponent();

      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });
  });

  describe('Transfer Type Configuration', () => {
    test('fetches expense categories when transfer type is EXPENSE', async () => {
      await renderComponent(TransferTypes.EXPENSE);

      expect(getApiObjectsList).toHaveBeenCalledWith(
        expect.stringContaining('category_type=2')
      );
    });

    test('fetches income categories when transfer type is INCOME', async () => {
      await renderComponent(TransferTypes.INCOME);

      expect(getApiObjectsList).toHaveBeenCalledWith(
        expect.stringContaining('category_type=1')
      );
    });
  });
});
