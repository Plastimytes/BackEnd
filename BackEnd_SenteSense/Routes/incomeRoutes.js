const express = require('express');
const{
    addIncome,
    getIncome,
    updateIncome,
    deleteIncome,
} = require('../controllers/incomeController');
const router = express.Router();

router.post('/add', addIncome);
router.post('/', getIncome);
router.put('/update', updateIncome);
router.post('/delete', deleteIncome);

module.exports = router;