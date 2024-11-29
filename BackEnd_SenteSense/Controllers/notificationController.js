const cron = require('node-cron');
const db = require('../Models/db');

// Send Notifications for Recurring Expenses
const sendExpenseNotifications = () => {
    const query = `
        SELECT u.email, e.category, e.amount, e.date 
        FROM expenses e
        JOIN users u ON e.user_id = u.id
        WHERE e.is_recurring = TRUE AND e.date = CURDATE()`;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Failed to fetch recurring expenses:', err);
            return;
        }
        
        results.forEach((record) => {
            console.log('Reminder sent to ${record.email}: ${record.category} of ${record.amount} is due today.');
            // Add your email or SMS sending logic here (e.g., using Nodemailer or Twilio).
        });
    });
};

// Warn Users About Budget Limits
const sendBudgetWarnings = () => {
    const query = `
        SELECT u.email, b.category, b.budget_limit, SUM(e.amount) AS total_spent
        FROM budgets b
        JOIN expenses e ON b.user_id = e.user_id AND b.category = e.category
        JOIN users u ON b.user_id = u.id
        WHERE e.date BETWEEN b.start_date AND b.end_date
        GROUP BY b.id
        HAVING total_spent >= b.budget_limit * 0.8`; // Warn when 80% of the budget is spent
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Failed to fetch budget warnings:', err);
            return;
        }
        
        results.forEach((record) => {
            console.log('Warning sent to ${record.email}: You have spent ${record.total_spent}/${record.budget_limit} in ${record.category}.');
            // Add your email or SMS sending logic here.
        });
    });
};

// Schedule Notifications
exports.scheduleNotifications = () => {
    // Daily at 8 AM
    cron.schedule('0 8 * * *', () => {
        console.log('Running scheduled tasks...');
        sendExpenseNotifications();
        sendBudgetWarnings();
    });
};