const express = require('express');
const { exportCsvReport, exportPdfReport }=require('../Controllers/reportController');
const router = express.Router();

router.post('/csv', exportCsvReport);
router.post('/pdf', exportPdfReport);

module.exports = router;