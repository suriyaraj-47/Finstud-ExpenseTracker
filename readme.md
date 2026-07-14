# FinStud

FinStud is a personal finance tracker built for students and early professionals to get a clear picture of their money — income, expenses, assets, liabilities, and goals — in one place.

## Why FinStud

Most budgeting apps are built for people who already have complex finances. FinStud is aimed at the earlier stage: someone tracking a stipend or first salary, a few small savings goals, and the basics of what they own versus what they owe.

## Features

- **Onboarding & signup** — guided setup for a new user's financial profile
- **Dashboard** — a single-screen summary of net worth, income vs. expenses, and progress toward goals
- **Money tracking** — log income and expenses by category
- **Wealth tracking** — record assets and liabilities to see net worth over time
- **Essentials** — core financial planning tools (budget breakdown, recurring costs)
- **Import** — bring in existing data rather than starting from zero
- **Goals** — set savings targets and track progress
- **Settings** — manage profile and account preferences
- **Auth** — email/password signup and login with JWT-based sessions, email verification, and password reset

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, vanilla JavaScript |
| Backend | Node.js, Express |
| Auth | JSON Web Tokens (JWT), bcrypt |
| Database | MySQL |
| Email | Nodemailer |

## Project Structure

```
finstud-project/
├── finstud/                # Frontend (static HTML/CSS/JS)
│   ├── css/
│   ├── js/                 # store.js (shared state), main.js
│   └── pages/               # signup, onboarding, dashboard, money, wealth, essentials, import, settings
└── finstud-backend/         # Backend (Node.js + Express + MySQL)
    ├── config/              # DB connection, mailer, schema.sql
    ├── middleware/           # JWT auth middleware
    └── routes/               # auth, profile, assets, money, goals, data
```

## Getting Started

Full setup instructions — installing dependencies, creating the database, configuring environment variables, and running the server — are in [`finstud-backend/README.md`](./finstud-backend/README.md).

Quick version:
```bash
cd finstud-backend
npm install
cp .env.example .env   # fill in your DB password, JWT secret, email credentials
mysql -u root -p < config/schema.sql
npm run dev
```
Then open `http://localhost:5000/pages/signup.html`.

## Roadmap

- [ ] Polish mobile layout across all pages
- [ ] Add data visualizations to the dashboard (spending trends, net worth over time)
- [ ] Recurring transaction support
- [ ] Export to CSV in addition to JSON

## Status

Actively in development. Issues and suggestions welcome.
