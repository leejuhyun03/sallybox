const express = require('express');
const cors = require('cors');
const db = require('./db');
const moviesRouter = require('./routes/movies');
const topRatedMoviesRouter = require('./routes/topRatedMovies');
const recommendMoviesRouter = require('./routes/recommendMovies'); // 추천 영화 라우터 추가
const recommendGenreRouter = require('./routes/recommendGenre'); // 추천 영화 라우터 추가

const app = express();
const PORT = process.env.PORT || 5000;

// CORS 설정
app.use(cors());

// DB 초기화
db.initialize();

// 라우트 설정
app.use('/api/movies', moviesRouter);
app.use('/api/movies/top-rated', topRatedMoviesRouter);
app.use('/api/movies/recommend', recommendMoviesRouter); // 추천 영화 라우터 추가
app.use('/api/movies/genre', recommendGenreRouter); // 추천 영화 라우터 추가

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
