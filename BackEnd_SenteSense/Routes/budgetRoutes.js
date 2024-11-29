const express = require('express');
const{
    addBudget,
    getBudgets,
    deleteBudget,
    updateBudget
}=require('../Controllers/budgetController');
const router=express.Router();

router.post('/add',addBudget);
router.get('/',getBudgets);
router.put('/update',updateBudget);
router.get('/delete',deleteBudget);

module.exports = router;