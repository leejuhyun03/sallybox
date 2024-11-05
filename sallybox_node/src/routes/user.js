const express = require('express');
const router = express.Router();
const db = require('../db');

// 특정 사용자 가져오기
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    let connection;

    try {
        connection = await db.getConnection();
        const result = await connection.execute(`
            SELECT 
                name,
                POINTS
            FROM Users
            WHERE user_id = :userId
        `, [userId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error('Error fetching user:', err);
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