const express = require('express');
const {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
}=require('../Controllers/expenseController');
const router = express.Router();

router.post('/add', addExpense);
router.get('/', getExpenses);
router.get('/update', updateExpense);
router.get('/delete', deleteExpense);

module.exports = router;