const db = require('../Models/db');

// Add Expense
exports.addExpense = (req, res) => {
    const { Expense_Id, User_Id, Category, Amount, Expense_date, Created_at, Updated_at } = req.body;
    const query = 'INSERT INTO expenses (Expense_Id, User_Id, Category, Amount, Expense_date, Created_at, Updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [Expense_Id, User_Id, Category, Amount, Expense_date, Created_at, Updated_at], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(201).json({ message: 'Expense added successfully' });
    });
};

// Get Expenses
exports.getExpenses = (req, res) => {
    const { user_id } = req.query;
    const query = 'SELECT * FROM expenses WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json(results);
    });
};

// Update Expense
exports.updateExpense = (req, res) => {
    const { id, category, amount, date, is_recurring } = req.body;
    const query = 'UPDATE expenses SET category = ?, amount = ?, date = ?, is_recurring = ? WHERE id = ?';
    db.query(query, [category, amount, date, is_recurring, id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json({ message: 'Expense updated successfully' });
    });
};

// Delete Expense
exports.deleteExpense = (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM expenses WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json({ message: 'Expense deleted successfully' });
    });
};