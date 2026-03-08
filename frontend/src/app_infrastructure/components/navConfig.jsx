// src/navigation/navConfig.tsx
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SellIcon from '@mui/icons-material/Sell';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';

export const navConfig = [
  {
    title: 'Wallets',
    items: [
      {
        url: '/wallets',
        label: 'Wallets',
        icon: <AccountBalanceWalletRoundedIcon />,
      },
      { url: '/periods', label: 'Periods', icon: <CalendarMonthIcon /> },
    ],
  },
  {
    title: 'Entities',
    items: [
      { url: '/deposits', label: 'Deposits', icon: <AccountBalanceIcon /> },
      {
        url: '/entities',
        label: 'Entities',
        icon: <LocalGroceryStoreRoundedIcon />,
      },
    ],
  },
  {
    title: 'Planning',
    items: [
      { url: '/categories', label: 'Categories', icon: <SellIcon /> },
      { url: '/predictions', label: 'Predictions', icon: <BarChartIcon /> },
    ],
  },
  {
    title: 'Transfers',
    items: [
      { url: '/incomes', label: 'Incomes', icon: <PaymentIcon /> },
      { url: '/expenses', label: 'Expenses', icon: <ReceiptIcon /> },
    ],
  },
];
