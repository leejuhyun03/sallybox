const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    let connection;

    try {
        connection = await db.getConnection();
        const result = await connection.execute(`
<<<<<<< HEAD
            SELECT 
                *
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
                WHERE release_date BETWEEN TRUNC(SYSDATE) - 20 AND TRUNC(SYSDATE)
                ORDER BY vote_average DESC
            ) 
=======
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
>>>>>>> 963c018b77b364d1a5310fbcfa99d105fdfe1969
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
