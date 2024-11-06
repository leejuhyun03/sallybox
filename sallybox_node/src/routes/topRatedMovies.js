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
                    SELECT 
                        movie_id AS movieId,
                        genre_ids AS genreIds,
                        poster_path AS posterPath,
                        title AS title,
                        vote_average AS voteAverage,
                        certification AS certification,
                        release_date AS releaseDate,
                        runtime AS runtime
                    FROM movies
                    ORDER BY DBMS_RANDOM.VALUE
                )
            WHERE ROWNUM <= 10
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching top-rated movies:', err);
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
