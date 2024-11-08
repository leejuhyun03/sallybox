const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const userId = req.query.userId; // 쿼리에서 userId 받기

    let connection;

    try {
        connection = await db.getConnection();
        const result = await connection.execute(`
            SELECT genre_id
            FROM (
                SELECT DISTINCT TRIM(REGEXP_SUBSTR(genre_ids, '[^,]+', 1, LEVEL)) AS genre_id
                FROM wishlist
                WHERE user_id = :userId
                AND LEVEL <= LENGTH(genre_ids) - LENGTH(REPLACE(genre_ids, ',', '')) + 1
                CONNECT BY REGEXP_SUBSTR(genre_ids, '[^,]+', 1, LEVEL) IS NOT NULL
            )
            WHERE genre_id IS NOT NULL
            AND ROWNUM <= 2
        `, {
            userId: userId
        });

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching recommended movies:', err);
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
