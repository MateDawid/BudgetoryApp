# Budgetory Frontend

React client for the **Budgetory** personal finance management application, backed by the [Budgetory Backend](https://github.com/MateDawid/Budgetory_Backend) REST API.

---

## Tech Stack

| | Technology |
|---|---|
| Framework | React (Create React App) |
| Package Manager | Yarn |
| Linting | ESLint |
| Containerisation | Docker |
| CI/CD | GitHub Actions |

---

## Features

### 🔐 User Authentication
Secure login and registration flow. User sessions are managed via token-based authentication with the backend API, ensuring that all data is scoped to the authenticated user.

---

### 📅 Budget Periods
Users can define distinct budget periods (e.g. monthly or custom date ranges) to organise their finances over time. Each period acts as a container for all income, expenses, and account data recorded within it.

![Budget Periods](docs/screenshots/budget_periods.png)

---

### 🏷️ Categories
Income and expense entries are assigned to categories, giving users a clear breakdown of where money is coming from and where it is going. Categories can be created and managed to match personal spending habits.

![Categories](docs/screenshots/categories.png)

---

### 💳 Deposits & Savings Accounts
Users can track multiple deposits and savings accounts within the application. Each account holds a balance that is updated as transactions are recorded, giving a real-time view of funds across all accounts.

![Deposits](docs/screenshots/deposits.png)

---

### 💰 Income & Expense Tracking
The core of the application — users can log individual income and expense transactions, assign them to a category and account, and attach them to a budget period. The transaction list provides a running history of all financial activity.

![Transactions](docs/screenshots/transactions.png)

---

### 🔮 Expense Predictions
Users can set predicted spending amounts for expense categories within a budget period. This allows planning ahead by estimating how much is expected to be spent in each category, and then tracking actual expenses against those predictions as the period progresses.

![Predictions](docs/screenshots/predictions.png)

---

### 📊 Reports & Charts
Visual summaries of financial data displayed through charts and aggregated statistics. Reports allow users to quickly assess their financial health within a given budget period, compare income against expenses, and identify spending trends across categories.

![Reports](docs/screenshots/reports.png)

---

## Related Repositories

| Repository | Description |
|---|---|
| [Budgetory_Backend](https://github.com/MateDawid/Budgetory_Backend) | Django REST Framework API powering this client |

---

## Author

**Dawid Matusiak** — [@MateDawid](https://github.com/MateDawid)
