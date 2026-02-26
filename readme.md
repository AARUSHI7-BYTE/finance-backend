This is the backend API for the Personal Finance Tracker application.

It provides secure REST APIs for:
	•	User-based Categories
	•	Transactions
	•	Budgets
	•	Savings Goals
	•	Recurring Payments
Authentication is handled using Supabase Auth (JWT verification).
All database access is protected using Row Level Security (RLS).

🛠 Tech Stack
	•	Node.js
	•	Express.js
	•	Supabase (PostgreSQL)
	•	JWT Authentication
	•	Row Level Security (RLS)

Project Structure
backend/
│
├── config/
│   └── supabase.js
│
├── controllers/
    ├── auth.controller.js
    ├── dashboard.controller.js
│   ├── transaction.controller.js
│   ├── category.controller.js
│   ├── budget.controller.js
│   ├── goal.controller.js
│
├── routes/
    ├── auth.routes.js
    ├── dashboard.routes.js
│   ├── transaction.routes.js
│   ├── category.routes.js
│   ├── budget.routes.js
│   ├── goal.routes.js
│
├── middleware/
│   └── auth.js
    └── errorHandler.js
│
└── server.js

📊 Database Tables
	•	profiles
	•	categories
	•	transactions
	•	budgets
	•	savings_goals
	•	recurring_payments
	•	shared_groups
	•	group_members

🚀 Setup Instructions

1️⃣ Clone Repository
git clone <repo-url> cd backend

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
PORT=3500

4️⃣ Run Server
npm run dev
http://localhost:3500


📌 API Endpoints

Categories
	•	GET /api/categories
	•	POST /api/categories
	•	DELETE /api/categories/:id

Transactions
	•	GET /api/transactions
	•	POST /api/transactions
	•	DELETE /api/transactions/:id

Budgets
	•	GET /api/budgets
	•	POST /api/budgets
	•	DELETE /api/budgets/:id

Goals
	•	GET /api/goals
	•	POST /api/goals
	•	PUT /api/goals/:id
	•	DELETE /api/goals/:id

⸻

🔒 Security
	•	Row Level Security enabled
	•	Users can access only their own data
	•	JWT verified on every protected request