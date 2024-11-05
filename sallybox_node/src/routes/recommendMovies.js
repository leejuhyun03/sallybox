const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const userId = req.query.userId; // 쿼리에서 userId 받기
    const selectedGenre = req.query.genre; // 쿼리에서 장르 받기
    
    let connection;

    try {
        connection = await db.getConnection();
        const result = await connection.execute(`
            WITH TopGenres AS (
                SELECT genre_id
                FROM (
                    SELECT TRIM(REGEXP_SUBSTR(genre_ids, '[^,]+', 1, LEVEL)) AS genre_id
                    FROM wishlist
                    WHERE user_id = :userId
                    CONNECT BY REGEXP_SUBSTR(genre_ids, '[^,]+', 1, LEVEL) IS NOT NULL
                )
                WHERE genre_id IS NOT NULL
                GROUP BY genre_id
                ORDER BY COUNT(*) DESC
            )
            SELECT *
            FROM (
                SELECT m.movie_id AS movieId,
                       m.genre_ids AS genreIds,
                       m.poster_path AS posterPath,
                       m.title AS title,
                       m.vote_average AS voteAverage,
                       m.certification AS certification,
                       m.release_date AS releaseDate,
                       m.runtime AS runtime
                FROM movies m
                WHERE EXISTS (
                    SELECT 1
                    FROM (
                        SELECT genre_id
                        FROM TopGenres
                        WHERE ROWNUM <= 2
                    ) tg
                    WHERE ',' || m.genre_ids || ',' LIKE '%,' || tg.genre_id || ',%'
                )
                AND ',' || m.genre_ids || ',' LIKE '%,' || :selectedGenre || ',%'
                ORDER BY DBMS_RANDOM.VALUE
            )
            WHERE ROWNUM <= 10
        `, {
            userId: userId,
            selectedGenre: selectedGenre
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
