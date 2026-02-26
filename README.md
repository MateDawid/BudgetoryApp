# Budgetory App

![CI](https://github.com/MateDawid/BudgetoryApp/actions/workflows/main.yml/badge.svg)
![Python](https://img.shields.io/badge/python-3.12-blue)
![Django](https://img.shields.io/badge/django-092E20?logo=django&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/DRF-ff1709?style=flat&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169E1?logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-18-61DAFB?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-ES6-F7DF1E?logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/docker-2496ED?logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/docker--compose-2496ED?logo=docker&logoColor=white)

FullStack personal finance management application consisting of a Django REST Framework API, PostgreSQL database, and React frontend client.

![app-flow.gif](docs/media/app-flow.gif)

---

## Tech Stack

### Backend

| Category | Technology |
|:---|:---|
| **Language** | Python 3.12 |
| **Framework** | Django + Django REST Framework |
| **Dependency Management** | Poetry |
| **Database** | PostgreSQL |
| **Configuration** | Dynaconf |
| **Code Quality** | Pre-commit hooks, Flake8 |
| **Containerisation** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions |

### Frontend

| Category | Technology |
|:---|:---|
| **Language** | JavaScript |
| **Framework** | React (Create React App) |
| **Package Manager** | Yarn |
| **Linting** | ESLint |
| **Containerisation** | Docker |
| **CI/CD** | GitHub Actions |

---

## Features

### 🔐 User Authentication

Token-based authentication system ensuring secure access to the API. Each user's data is fully isolated — wallets, periods, deposits, categories, and transfers are scoped to the authenticated user. Supports registration, login, logout, and demo login.

---

### 📊 Landing Page with Dashboard

#### Frontend
After logging in, users are greeted with a dashboard that provides a high-level overview of their financial situation. It summarises key metrics such as total income and expenses for the current period, deposit balances, and progress against expense predictions — giving users an at-a-glance snapshot of where they stand financially.

#### Backend
The API provides computed endpoints that aggregate financial data for dashboard display. These endpoints calculate key metrics such as total income and expenses for the current period, deposit balances across wallets, and progress tracking against expense predictions — delivering real-time financial summaries.

![Landing page](docs/media/landing_page.png)

---

### 👛 Wallets

#### Frontend
Wallets organise multiple deposits under a common purpose. Users can manage multiple wallets to keep separate budgets organised — for example, a daily wallet and a long-term savings wallet — each with its own periods, deposits, and transfer history.

#### Backend
API endpoints for managing wallets that organise multiple deposits under a common purpose. Each wallet can contain its own periods, deposits, and transfer history, enabling users to maintain separate budgets (e.g., daily spending vs. long-term savings). Supports CRUD operations with user-scoped isolation.

![Wallets](docs/media/wallets.png)

---

### 📅 Periods

#### Frontend
Users can define distinct periods (e.g. monthly or custom date ranges) to organise their finances over time. Each period acts as a container for all incomes, expenses, and predictions recorded within it.

#### Backend
API for managing periods that represent time ranges (e.g. monthly or custom date ranges) during which financial activity is tracked. Each period acts as a container for incomes, expenses, and predictions. The API enforces that periods cannot overlap within the same wallet and handles cascading deletion of related data.

![Periods](docs/media/periods.png)

---

### 💳 Deposits

#### Frontend
Users can track multiple deposit accounts within the application. Each account holds a balance that is updated as transfers are recorded, giving a real-time view of funds across all accounts.

#### Backend
CRUD operations for deposit accounts within wallets. Each deposit tracks a balance that is automatically calculated and updated based on linked transfers. The API maintains real-time balance accuracy across all deposits and supports filtering by wallet and period.

![Deposits](docs/media/deposits.png)

---

### 🏢 Entities

#### Frontend
Entities represent the external parties involved in financial transactions — such as employers, shops, service providers, or individuals. Users can create and manage a list of entities and associate them with income or expense transfers, making it easy to track who money is coming from or going to.

#### Backend
API for managing entities that represent external parties involved in financial transactions (employers, shops, service providers, individuals). Entities can be associated with income or expense transfers to track money flow sources and destinations. Supports user-specific entity management with validation to prevent deletion of entities referenced by existing transfers.

![Entities](docs/media/entities.png)

---

### 🏷️ Categories

#### Frontend
Income and expense entries are assigned to categories, giving users a clear breakdown of where money is coming from and where it is going. Categories can be created and managed to match personal spending habits.

#### Backend
CRUD operations for income and expense categories used to classify transfers. Categories are user-specific and each has a type (`income` or `expense`). The API prevents deletion of categories that are referenced by existing transfers to maintain data integrity.

![Categories](docs/media/categories.png)

---

### 🔮 Expense Predictions

#### Frontend
Users can set predicted spending amounts for expense categories within a period. This allows planning ahead by estimating how much is expected to be spent in each category, and then tracking actual expenses against those predictions as the period progresses.

#### Backend
API for setting and managing predicted spending amounts for expense categories within periods. Predictions are unique per category per period and allow tracking of predicted versus actual spending. Only expense categories can have predictions. The API provides comparison endpoints for budget adherence monitoring.

![Predictions](docs/media/predictions.png)

---

### 💰 Incomes

#### Frontend
Users can log individual income transfers and assign them to a category, a deposit, and a period. Each income entry can also be linked to a source entity, making it easy to track where money is coming from. The incomes list provides a full history of all received funds, filterable by period.

#### Backend
Income transfer management API supporting creation, retrieval, updating, and deletion of income entries. Each income is linked to a category, deposit, period, and optionally a source entity. The API supports filtering by period and provides full transfer history with automatic deposit balance updates.

![Incomes](docs/media/incomes.png)

---

### 💸 Expenses

#### Frontend
Users can log individual expense transfers and assign them to a category, a deposit, and a period. Each expense can also be linked to a target entity, making it easy to see where money is being spent. The expenses list provides a full history of all outgoing payments, filterable by period, and can be compared against predictions to track budget adherence.

#### Backend
Expense transfer management API supporting creation, retrieval, updating, and deletion of expense entries. Each expense is linked to a category, deposit, period, and optionally a target entity. The API supports filtering by period, comparison against predictions for budget tracking, and automatic deposit balance updates.

![Expenses](docs/media/expenses.png)

---

## Local Setup

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) (for local frontend development)
- [Python 3.12](https://www.python.org/) (for local backend development)

### Running with Docker Compose

```bash
# Clone the repository
git clone https://github.com/MateDawid/BudgetoryApp.git
cd BudgetoryApp

# Prepare .env files for both services
cp backend/.env_docker backend/.env
cp frontend/.env_example frontend/.env

# Build services
docker compose build

# Run app with frontend instant reload on changes
docker compose up --watch

# Run app casually
docker compose up -d
```

The API will be available at `http://localhost:8000` and the frontend at `http://localhost:3000`.

### Running Locally

**Backend:**
```bash
cd backend
# Create and activate virtual env
py -3.12 -m venv venv
.\venv\Scripts\activate
# Verify Python version - has to be 3.12.?
python --version
# Install pip, setuptools and poetry
python -m pip install -U pip setuptools
python -m pip install poetry
# Install app dependencies with poetry
poetry install
# Run database service
docker compose up -d db
# Copy .env_local content and create .env file with it
cp .env_local .env
# Run database migrations
poetry run python .\src\manage.py migrate
# Run API service
poetry run python .\src\manage.py runserver
```

**Frontend:**
```bash
# Install yarn
npm install --global yarn
# Install app dependencies
cd frontend
yarn install
# Copy .env_example content and create .env file with it
cp .env_example .env
# Run frontend service
yarn start
```

The API will be available at `http://localhost:8000` and the frontend at `http://localhost:3000`.

---

## Author

**Dawid Mateusiak** — [@MateDawid](https://github.com/MateDawid)