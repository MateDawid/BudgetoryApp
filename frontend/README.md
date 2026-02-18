# Budgetory Frontend

React client for the **Budgetory** personal finance management application, backed by the [Budgetory Backend](https://github.com/MateDawid/Budgetory_Backend) REST API.

---

## Tech Stack

| | Technology |
|---|---|
| Language | JavaScript |
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

### 📊 Landing page with dashboard

???

![Reports](docs/screenshots/landing_page.png)

---

### Wallets 

???

![Wallets](docs/screenshots/wallets.png)

---

### 📅 Periods
Users can define distinct periods (e.g. monthly or custom date ranges) to organise their finances over time. Each period acts as a container for all incomes, expenses, and predictions recorded within it.

![Periods](docs/screenshots/periods.png)

---

### 💳 Deposits
Users can track multiple deposits within the application. Each account holds a balance that is updated as transfers are recorded, giving a real-time view of funds across all accounts.

![Deposits](docs/screenshots/deposits.png)

---

### Entities
???

![Entities](docs/screenshots/entities.png)

---

### 🏷️ Categories
Income and expense entries are assigned to categories, giving users a clear breakdown of where money is coming from and where it is going. Categories can be created and managed to match personal spending habits.

![Categories](docs/screenshots/categories.png)

---

### 🔮 Expense Predictions
Users can set predicted spending amounts for expense categories within a period. This allows planning ahead by estimating how much is expected to be spent in each category, and then tracking actual expenses against those predictions as the period progresses.

![Predictions](docs/screenshots/predictions.png)

---
### Incomes
Users can log individual income transfers, assign them to a category and deposit, and attach them to period. The incomes list provide a running history of all financial activity.

![Incomes](docs/screenshots/incomes.png)

---

### Expenses
Users can log individual expense transfers, assign them to a category and deposit, and attach them to period. The expenses list provide a running history of all financial activity.

![Expenses](docs/screenshots/expenses.png)

---

## Related Repositories

| Repository | Description |
|---|---|
| [Budgetory_Backend](https://github.com/MateDawid/Budgetory_Backend) | Django REST Framework API powering this client |

---

## Author

**Dawid Mateusiak** — [@MateDawid](https://github.com/MateDawid)
