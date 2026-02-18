# Budgetory Frontend

React client for the **Budgetory** personal finance management application, backed by the [Budgetory Backend](https://github.com/MateDawid/Budgetory_Backend) REST API.

---

## Tech Stack

|  |  |
| --- | --- |
| **Language** | JavaScript |
| **Framework** | React (Create React App) |
| **Package Manager** | Yarn |
| **Linting** | ESLint |
| **Containerisation** | Docker |
| **CI/CD** | GitHub Actions |



---

## Features

### 🔐 User Authentication

Secure login and registration flow. User sessions are managed via token-based authentication with the backend API, ensuring that all data is scoped to the authenticated user.

---

### 📊 Landing page with dashboard

After logging in, users are greeted with a dashboard that provides a high-level overview of their financial situation. It summarises key metrics such as total income and expenses for the current period, deposit balances, and progress against expense predictions — giving users an at-a-glance snapshot of where they stand financially.

![Landing page](docs/screenshots/landing_page.png)

---

### 👛 Wallets

Wallets organize multiple Deposits under a common purpose. Users can manage multiple wallets to keep separate budgets organised — for example, a daily wallet and a long term wallet — each with its own periods, deposits, and transfer history.

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

### 🏢 Entities

Entities represent the external parties involved in financial transactions — such as employers, shops, service providers, or individuals. Users can create and manage a list of entities and associate them with income or expense transfers, making it easy to track who money is coming from or going to.

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

### 💰 Incomes

Users can log individual income transfers and assign them to a category, a deposit, and a period. Each income entry can also be linked to a source entity, making it easy to track where money is coming from. The incomes list provides a full history of all received funds, filterable by period.

![Incomes](docs/screenshots/incomes.png)

---

### 💸 Expenses

Users can log individual expense transfers and assign them to a category, a deposit, and a period. Each expense can also be linked to a target entity, making it easy to see where money is being spent. The expenses list provides a full history of all outgoing payments, filterable by period, and can be compared against predictions to track budget adherence.

![Expenses](docs/screenshots/expenses.png)

---

## Related Repositories

| Repository | Description |
| --- | --- |
| [Budgetory\_Backend](https://github.com/MateDawid/Budgetory_Backend) | Django REST Framework API powering this client |



---

## Author

**Dawid Mateusiak** — [@MateDawid](https://github.com/MateDawid)
