const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const db = require('../Models/db');

// Generate CSV Report
exports.exportCsvReport = (req, res) => {
    const { user_id } = req.query;
    const query = `
        SELECT e.category, e.amount, e.date, 'Expense' AS type FROM expenses e WHERE e.user_id = ?
        UNION ALL
        SELECT i.source AS category, i.amount, i.date, 'Income' AS type FROM income i WHERE i.user_id = ?
    `;

    db.query(query, [user_id, user_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(results);

        res.header('Content-Type', 'text/csv');
        res.attachment('financial_report.csv');
        res.send(csv);
    });
};

// Generate PDF Report
exports.exportPdfReport = (req, res) => {
    const { user_id } = req.query;
    const query = `
        SELECT e.category, e.amount, e.date, 'Expense' AS type FROM expenses e WHERE e.user_id = ?
        UNION ALL
        SELECT i.source AS category, i.amount, i.date, 'Income' AS type FROM income i WHERE i.user_id = ?
    `;

    db.query(query, [user_id, user_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        const pdfDoc = new PDFDocument();
        const filePath = './reports/financial_report_${user_id}.pdf';

        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.pipe(res);

        pdfDoc.fontSize(16).text('Financial Report', { align: 'center' });
        pdfDoc.moveDown();

        results.forEach((row) => {
            pdfDoc.fontSize(12).text('Type: ${row.type}, Category: ${row.category}, Amount: ${row.amount}, Date: ${row.date}');
        });

        pdfDoc.end();
    });
};