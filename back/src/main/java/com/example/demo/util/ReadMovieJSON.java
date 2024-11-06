package com.example.demo.util;

import com.example.demo.DTO.JY.MovieDTO;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
public class ReadMovieJSON {

    public static List<MovieDTO> processMovies(JSONArray moviesArray) {
        List<MovieDTO> movieList = new ArrayList<>();
    
        // JSONArray 내부의 각 JSONObject를 처리
        for (Object obj : moviesArray) {
            JSONObject movie = (JSONObject) obj;
    
            MovieDTO movieDTO = new MovieDTO();
            movieDTO.setMovieId(Integer.parseInt(movie.get("id").toString()));
            movieDTO.setTitle(movie.get("title").toString());
            movieDTO.setReleaseDate(movie.get("release_date").toString());
            movieDTO.setPopularity(Double.parseDouble(movie.get("popularity").toString()));
            movieDTO.setVoteAverage(Double.parseDouble(movie.get("vote_average").toString()));
            movieDTO.setOverview(movie.get("overview").toString());
            movieDTO.setOriginalLanguage(movie.get("original_language").toString());
            movieDTO.setPosterPath(movie.get("poster_path").toString());
			// // 추가 정보 처리 (null 체크 제거)
            // movieDTO.setRuntime(movie.get("runtime").toString());
            // movieDTO.setCertification(movie.get("certification").toString());
            // movieDTO.setVideos(movie.get("videos").toString());

            // 추가 정보 처리 (null 체크 추가)
            if (movie.get("runtime") != null) {
                movieDTO.setRuntime(movie.get("runtime").toString()); //지영 int관련으로 그냥 냅두고
            }
            if (movie.get("certification") != null) {
                movieDTO.setCertification(movie.get("certification").toString());
            }
            if (movie.get("videos") != null) {
                movieDTO.setVideos(movie.get("videos").toString());
            }

            // 장르 ID 리스트를 처리
            JSONArray genreArray = (JSONArray) movie.get("genre_ids");
            List<Integer> genreIds = new ArrayList<>();
            for (Object genreId : genreArray) {
                genreIds.add(Integer.parseInt(genreId.toString()));
            }
            movieDTO.setGenreIds(genreIds);
            

            movieList.add(movieDTO);
        }
    
        return movieList;
    }
}
