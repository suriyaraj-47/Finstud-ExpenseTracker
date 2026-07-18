# FinStud Backend — Setup Guide

## Prerequisites
- Node.js v18+
- MySQL 8.0+

## 1. Install Dependencies
```bash
cd finstud-backend
npm install
```

## 2. Create MySQL Database & Tables
```bash
mysql -u root -p < config/schema.sql
```

## 3. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` and fill in:
- `DB_PASSWORD` — your MySQL root password
- `JWT_SECRET` — any long random string (e.g. `openssl rand -hex 32`)
- `EMAIL_USER` / `EMAIL_PASS` — Gmail address + App Password (enable 2FA → App Passwords)
- `FRONTEND_URL` — where your frontend runs (e.g. `http://localhost:5500`)

## 4. Start the Server
```bash
# Development (auto-restart on change)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## 5. Open the Frontend
Open `finstud/pages/signup.html` in your browser using **Live Server** (VS Code extension) or any static server on port 5500.

Or serve both together:
```bash
# The Express server already serves the frontend at http://localhost:5000
# Open http://localhost:5000/pages/signup.html
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Sign in, get JWT |
| GET | `/api/auth/verify?token=` | No | Verify email |
| POST | `/api/auth/forgot-password` | No | Send reset email |
| POST | `/api/auth/reset-password` | No | Set new password |
| GET | `/api/auth/me` | ✅ | Get current user |
| PATCH | `/api/auth/update-profile` | ✅ | Update display name |
| POST | `/api/auth/change-password` | ✅ | Change password |
| DELETE | `/api/auth/delete-account` | ✅ | Delete account |
| GET | `/api/profile` | ✅ | Get financial profile |
| PUT | `/api/profile` | ✅ | Save financial profile |
| GET | `/api/assets` | ✅ | List all assets |
| POST | `/api/assets` | ✅ | Add asset |
| PATCH | `/api/assets/:id` | ✅ | Update asset |
| DELETE | `/api/assets/:id` | ✅ | Delete asset |
| GET | `/api/money/income` | ✅ | List income entries |
| POST | `/api/money/income` | ✅ | Add income |
| DELETE | `/api/money/income/:id` | ✅ | Delete income entry |
| GET | `/api/money/expenses` | ✅ | List expenses |
| POST | `/api/money/expenses` | ✅ | Add expense |
| DELETE | `/api/money/expenses/:id` | ✅ | Delete expense |
| GET | `/api/goals` | ✅ | List goals |
| POST | `/api/goals` | ✅ | Create goal |
| PATCH | `/api/goals/:id` | ✅ | Update goal |
| DELETE | `/api/goals/:id` | ✅ | Delete goal |
| GET | `/api/data/export` | ✅ | Download all data as JSON |
| DELETE | `/api/data/reset` | ✅ | Reset all financial data |

---

## Project Structure
```
finstud-backend/
├── server.js              ← Express app entry point
├── .env.example           ← Environment variables template
├── config/
│   ├── db.js              ← MySQL connection pool
│   ├── schema.sql         ← Database schema (run once)
│   └── mailer.js          ← Nodemailer (email verification + reset)
├── middleware/
│   └── auth.js            ← JWT verification middleware
└── routes/
    ├── auth.js            ← Register, login, verify, reset password
    ├── profile.js         ← Financial profile CRUD
    ├── assets.js          ← Assets CRUD
    ├── money.js           ← Income & expenses CRUD
    ├── goals.js           ← Goals CRUD
    └── data.js            ← Export & reset
```
