package com.example.demo.Impl;

import java.util.stream.Collectors;
import java.util.*;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JY.MovieDTO;
import com.example.demo.DTO.JY.NowMovieDTO;
import com.example.demo.DTO.JY.ReviewsDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;
import com.example.demo.mapper.SqlMapper;
import com.example.demo.service.MovieService;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

// 비즈니스 로직을 담당하는 서비스 클래스
@Service
@RequiredArgsConstructor // 생성자 주입을 위한 어노테이션
public class MovieServiceImpl implements MovieService {

    private final SqlMapper sqlMapper; // 데이터베이스 접근을 위한 매퍼
    

    @Override
    @Transactional
    public void saveMovies(MovieDTO movie) {
        // 장르 ID를 CSV 문자열로 변환
        if (movie.getGenreIds() != null) {
            movie.setGenreIdsString(
                movie.getGenreIds().stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","))
            );
        }

        // 10749 장르 ID를 포함하는 영화는 DB에 저장하지 않음
        if (movie.getGenreIds() != null && movie.getGenreIds().contains(10749)) {
            return; // 저장하지 않고 메서드 종료
        }

        // 필수 필드가 모두 존재하는지 확인
        if (sqlMapper.findById(movie.getMovieId()) == null && 
        isValidMovie(movie)) { // 영화의 유효성을 검사하는 메서드 호출

        // null 체크 추가
        if (movie.getOriginalLanguage() == null) {
            movie.setOriginalLanguage("");
        }
        if (movie.getOverview() == null) {
            movie.setOverview("");
        }
        if (movie.getPopularity() == null) {
            movie.setPopularity(0.0);
        }
        if (movie.getPosterPath() == null) {
            movie.setPosterPath("");
        }
        if (movie.getReleaseDate() == null) {
            movie.setReleaseDate("");
        }
        if (movie.getTitle() == null) {
            movie.setTitle("");
        }
        if (movie.getVoteAverage() == null) {
            movie.setVoteAverage(0.0);
        }
        if (movie.getVideos() == null) {
            movie.setVideos("");
        }
        if (movie.getRuntime() == null) {
            movie.setRuntime("");
        }
        if (movie.getCertification() == null) {
            movie.setCertification("");
        }
            try {
                sqlMapper.insertMovie(movie); // 영화 정보 저장
            } catch (Exception e) {
                System.out.println("DB 저장 실패: " + e.getMessage()); // 에러 메시지 출력
                e.printStackTrace(); // 스택 트레이스 출력
            }
        }
    }

    // 영화의 필수 필드가 모두 유효한지 확인하는 메서드
    private boolean isValidMovie(MovieDTO movie) {
        return movie.getTitle() != null && !movie.getTitle().isEmpty() &&
            movie.getReleaseDate() != null && !movie.getReleaseDate().isEmpty() &&
            movie.getOverview() != null && !movie.getOverview().isEmpty() &&
            movie.getOriginalLanguage() != null && !movie.getOriginalLanguage().isEmpty() &&
            movie.getPosterPath() != null && !movie.getPosterPath().isEmpty() &&
            movie.getPopularity() != null && movie.getPopularity() >= 0 && // 인기 점수가 null이 아니고 0 이상인지 체크
            movie.getVoteAverage() != null && movie.getVoteAverage() >= 0 && movie.getVoteAverage() <= 10 && // 평점이 null이 아니고 0~10 사이인지 체크
            movie.getGenreIds() != null && !movie.getGenreIds().isEmpty() && // 장르 ID 리스트가 null이 아니고 비어있지 않은지 체크
            movie.getGenreIdsString() != null && !movie.getGenreIdsString().isEmpty() && // 장르 ID 문자열이 null이 아니고 비어있지 않은지 체크
            movie.getVideos() != null && !movie.getVideos().isEmpty() && // 트레일러 키가 null이 아니고 비어있지 않은지 체크
            movie.getRuntime() != null && !movie.getRuntime().isEmpty() && // 런타임이 null이 아니고 비어있지 않은지 체크
            movie.getCertification() != null && !movie.getCertification().isEmpty(); // 인증 정보가 null이 아니고 비어있지 않은지 체크
    }

    // 제목으로 영화 검색
    @Override
    @Transactional(readOnly = true) // 읽기 전용 트랜잭션
    public List<MovieDTO> searchMoviesByTitle(String title) {
        // 제목을 이용해 영화를 검색하는 메서드
        return sqlMapper.findMoviesByTitle(title);
    }

    @Override
    @Transactional(readOnly = true)
    public MovieDTO findMovieById(int movieId) {
        return sqlMapper.findById(movieId);
    }

     // 위시리스트 기능 구현

     @Override
     public boolean isMovieInWishlist(int userId, int movieId) {
         return sqlMapper.checkWishlist(userId, movieId) > 0;
     }
 
     @Override
    public boolean toggleWishlist(int userId, int movieId, String genreIds ) {
        try {
            if (sqlMapper.checkWishlist(userId, movieId) > 0) {
                sqlMapper.deleteWishlist(userId, movieId);
                return false; // 좋아요 취소
            } else {
                sqlMapper.insertWishlist(userId, movieId, genreIds);
                return true; // 좋아요 추가
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("위시리스트 업데이트 중 오류가 발생했습니다."); // 적절한 예외 메시지
        }
    }

    //리뷰리뷰

    // 트랜잭션 처리 추가: 리뷰 저장
    // 리뷰 저장
    @Override
    @Transactional
        public void saveReview(ReviewsDTO reviewsDTO) {
            // 리뷰 텍스트가 null이거나 10글자 미만이면 저장하지 않음
        if (reviewsDTO.getReviewText() == null || reviewsDTO.getReviewText().length() < 10) {
            throw new RuntimeException("리뷰는 최소 10글자 이상이어야 합니다.");
        }

        // createdAt 필드에 현재 시간을 설정 --1103
        reviewsDTO.setCreatedAt(ZonedDateTime.now(ZoneId.of("Asia/Seoul")));

        System.out.println("저장할 리뷰 텍스트: " + reviewsDTO.getReviewText());

        sqlMapper.insertReview(reviewsDTO); // 리뷰 저장
    }

    // 리뷰 수정
    @Override
    @Transactional
    public void updateReview(ReviewsDTO reviewsDTO) {
        sqlMapper.updateReview(reviewsDTO); // 리뷰 수정
    }

    // 리뷰 삭제 (추천도 함께 삭제)
    @Override
    @Transactional
    public void deleteReview(int reviewId, int userId) {
        sqlMapper.deleteReview(reviewId, userId);  // 리뷰 삭제
    }

    // 특정 영화의 리뷰 목록 가져오기
    @Override
    @Transactional(readOnly = true)
    public List<ReviewsDTO> getReviewsByMovieId(int movieId) {
        return sqlMapper.findReviewsByMovieId(movieId); // 리뷰 목록 가져오기
    }

    // 추천 토글 방식: 추천 추가 또는 삭제
    @Override
    @Transactional
    public void toggleLikeReview(int reviewId, int userId) {
        if (sqlMapper.isReviewLiked(reviewId, userId) == 0) {
            sqlMapper.addLike(reviewId, userId); // 추천 추가
        } else {
            sqlMapper.removeLike(reviewId, userId); // 추천 취소
        }
    }

    // 리뷰 추천수 계산
    @Override
    @Transactional(readOnly = true)
    public int getLikesCount(int reviewId) {
        return sqlMapper.countReviewLikes(reviewId); // REVIEW_LIKES 테이블에서 추천 수 계산
    }

    //예매페이지!!!!!!!!!!!!!!!!!!!!!!!!!
    @Override
    public CinemaDTO getCinemaInfojy(int cinema_id) {
        return sqlMapper.getCinemaInfojy(cinema_id); // movieMapper로 수정
    }

    @Override
    public List<SchedulesTheaterDTO> getSchedulesTheaterjy(int cinema_id) {
        return sqlMapper.getSchedulesTheaterjy(cinema_id); // movieMapper로 수정
    }

    @Override
    public Map<String, List<SchedulesTheaterDTO>> groupCinemaSchedules(List<SchedulesTheaterDTO> schedules) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return schedules.stream().collect(Collectors.groupingBy(schedule -> {
            LocalDate localDate = schedule.getCreated().toInstant().atZone(
                java.time.ZoneId.systemDefault()).toLocalDate();
            return localDate.format(formatter);
    }));

        }//key는 created,value = created에 속하는 ScheduleDTO의 객체들의 List

    
    // 특정 지역의 영화관 목록을 가져오는 메서드
    @Override
    public List<CinemaDTO> getCinemasByRegion(String region) {
        return sqlMapper.getCinemasByRegion(region);
    }

    //현재 상영작 20개
    @Override
    public NowMovieDTO getNowMovieById(int movieId) {
        return sqlMapper.findNowMovieById(movieId);
    }

    @Override
    public boolean checkIfMovieExists(int movieId) {
        return sqlMapper.existsByMovieId(movieId) != null;
    }


}
