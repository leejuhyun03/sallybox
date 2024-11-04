const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    let connection;

    try {
        connection = await db.getConnection();
        const result = await connection.execute(`
            SELECT *
            FROM (
                SELECT *
                FROM nowmovies
                ORDER BY TO_DATE(release_date, 'YYYY-MM-DD') DESC
            )
            WHERE ROWNUM <= 10
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching recent movies:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
});

module.exports = router;
