const { scheduleNotifications} = require('./Controllers/notificationController');

// Schedule notifications 
scheduleNotifications();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./Models/db');
const authRoutes = require('./Routes/authRoutes');
const expenseRoutes = require('./Routes/expenseRoutes');
const incomeRoutes = require('./Routes/incomeRoutes');
const budgetRoutes = require('./Routes/budgetRoutes');
const reportRoutes = require('./Routes/reportRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running  at port http://localhost:${PORT}`));