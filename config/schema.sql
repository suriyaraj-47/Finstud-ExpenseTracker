-- ═══════════════════════════════════════════════
--   FinStud — MySQL Schema
--   Run: mysql -u root -p < config/schema.sql
-- ═══════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS finstud CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE finstud;

-- ── Users ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(100)  NOT NULL,
  email           VARCHAR(150)  NOT NULL UNIQUE,
  password_hash   VARCHAR(255)  DEFAULT NULL,
  google_id       VARCHAR(255)  UNIQUE DEFAULT NULL,
  profile_pic     VARCHAR(500)  DEFAULT NULL,
  is_verified     TINYINT(1)    NOT NULL DEFAULT 0,
  verify_token    VARCHAR(255)  DEFAULT NULL,
  reset_token     VARCHAR(255)  DEFAULT NULL,
  reset_expires   DATETIME      DEFAULT NULL,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Financial Profile ──────────────────────────
CREATE TABLE IF NOT EXISTS financial_profiles (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT           NOT NULL UNIQUE,
  age             INT           DEFAULT NULL,
  monthly_income  DECIMAL(15,2) DEFAULT 0,
  monthly_expense DECIMAL(15,2) DEFAULT 0,
  monthly_savings DECIMAL(15,2) DEFAULT 0,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Assets ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS assets (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT            NOT NULL,
  name          VARCHAR(200)   NOT NULL,
  asset_type    VARCHAR(100)   NOT NULL DEFAULT 'Other',
  value         DECIMAL(15,2)  NOT NULL DEFAULT 0,
  created_at    DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Income ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS income (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT            NOT NULL,
  name        VARCHAR(200)   NOT NULL,
  amount      DECIMAL(15,2)  NOT NULL,
  category    VARCHAR(100)   DEFAULT 'Other',
  entry_date  DATE           NOT NULL,
  created_at  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Expenses ───────────────────────────────────
CREATE TABLE IF NOT EXISTS expenses (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT            NOT NULL,
  name        VARCHAR(200)   NOT NULL,
  amount      DECIMAL(15,2)  NOT NULL,
  category    VARCHAR(100)   DEFAULT 'Other',
  entry_date  DATE           NOT NULL,
  created_at  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Liabilities ───────────────────────────────────
CREATE TABLE IF NOT EXISTS liabilities (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT            NOT NULL,
  name        VARCHAR(200)   NOT NULL,
  amount      DECIMAL(15,2)  NOT NULL,
  created_at  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_liabilities_user ON liabilities(user_id);

-- ── Goals ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS goals (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT            NOT NULL,
  name        VARCHAR(200)   NOT NULL,
  target      DECIMAL(15,2)  NOT NULL,
  target_date DATE           DEFAULT NULL,
  created_at  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Indexes ────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_assets_user   ON assets(user_id);
CREATE INDEX IF NOT EXISTS idx_income_user   ON income(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_user ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_user    ON goals(user_id);
CREATE INDEX IF NOT EXISTS idx_income_date   ON income(user_id, entry_date);
CREATE INDEX IF NOT EXISTS idx_expense_date  ON expenses(user_id, entry_date);

-- ── Snapshots ──────────────────────────────────
CREATE TABLE IF NOT EXISTS snapshots (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT            NOT NULL,
  net_worth     DECIMAL(15,2)  NOT NULL DEFAULT 0,
  assets        DECIMAL(15,2)  NOT NULL DEFAULT 0,
  liabilities   DECIMAL(15,2)  NOT NULL DEFAULT 0,
  label         VARCHAR(255)   DEFAULT NULL,
  entry_date    DATETIME       NOT NULL,
  created_at    DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_snapshots_user  ON snapshots(user_id);

-- ── Feedbacks ──────────────────────────────────
CREATE TABLE IF NOT EXISTS feedbacks (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT            NOT NULL,
  type        VARCHAR(50)    NOT NULL DEFAULT 'Other',
  message     TEXT           NOT NULL,
  created_at  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_feedbacks_user ON feedbacks(user_id);


SELECT 'FinStud schema created successfully.' AS status;
