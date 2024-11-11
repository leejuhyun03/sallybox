package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

import javax.websocket.server.PathParam;

import com.example.demo.DTO.JH.BookingDTO;
import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JH.CinemaScheduleDTO;
import com.example.demo.DTO.JH.PaymentDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;
import com.example.demo.DTO.JH.SeatsDTO;
import com.example.demo.DTO.JY.InquiryRequest;
import com.example.demo.DTO.KH.CustomDTO;
import com.example.demo.DTO.KH.FindEmailRequest;
import com.example.demo.DTO.KH.LoginRequest;
import com.example.demo.DTO.KH.NowMoviesDTO;
import com.example.demo.DTO.SH.CustomerDTO;
import com.example.demo.DTO.SH.MyBookingDTO;
import com.example.demo.DTO.SH.MyMovieDTO;
import com.example.demo.DTO.SH.MyPayDTO;
import com.example.demo.DTO.SH.ProfileDTO;
import com.example.demo.DTO.SH.UserDeactivationDTO;
import com.example.demo.DTO.SH.UserUpdateDTO;
import com.example.demo.DTO.ZERO.MovieDTO;
import com.example.demo.DTO.ZERO.NowMovieDTO;
import com.example.demo.DTO.ZERO.ReviewsDTO;
import com.example.demo.DTO.ZERO.WishlistDTO;
import com.example.demo.service.MovieService;
import com.example.demo.service.SqlService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin(origins = "http://localhost:3000") //지영
public class AllController {
    
    @Autowired
    private SqlService sqlService;

     //지영
    @Autowired
    private MovieService movieService; // 영화 관련 작업을 처리하는 서비스

    @Autowired
    private RestTemplate restTemplate; // REST API 호출을 위한 클래스

    @Autowired
    private ObjectMapper objectMapper; // JSON 응답을 파싱하는 데 사용

    private static final String API_KEY = "c1fe680d16ac165e297b9bf72e80e897"; // 실제 API 키로 변경 필요
    private static final String LANGUAGE = "ko-KR"; // 언어 설정
    private static final String REGION = "KR"; // 지역 설정
    private static final int NOW_PLAYING_TOTAL_PAGES = 5; // 현재 상영 중 영화 페이지 수
    private static final int POPULAR_TOTAL_PAGES = 25; // 인기 영화 페이지 수

    //주현//
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sallybox/cinema/{id}")
    public CinemaScheduleDTO getSchedules(@PathVariable("id") int cinema_id) throws Exception{

        CinemaDTO cinemaDTO = sqlService.getCinemaInfo(cinema_id);

        List<SchedulesTheaterDTO> schedules = sqlService.getSchedulesTheater(cinema_id);     

        Map<String,List<SchedulesTheaterDTO>> scheduleMap = sqlService.groupCinemaSchedules(schedules);

        // null 값 검사
        if (cinemaDTO == null) {
            throw new IllegalStateException("cinemaDTO is null for cinema ID: " + cinema_id);
        }
        
        if (scheduleMap == null) {
            throw new IllegalStateException("scheduleMap is null for cinema ID: " + cinema_id);
        }

        return new CinemaScheduleDTO(cinemaDTO,scheduleMap);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sallybox/reserv/seats")
    public List<SeatsDTO> getSeatsbyTheaterId(@RequestParam("theater_id") Integer theater_id,@RequestParam int schedule_id) throws Exception{
        return sqlService.getSeatsbyTheaterId(theater_id,schedule_id);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/sallybox/payment")
    public Integer getPoints(@RequestBody Map<String, Integer> requestData) throws Exception{
        int userId = requestData.get("user_id");
        return sqlService.getPoints(userId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/sallybox/payment/booking")
    public ResponseEntity<Void> createBooking(@RequestBody BookingDTO bookingDTO) throws Exception{
        try{
            sqlService.insertBooking(bookingDTO);
            return ResponseEntity.ok().build(); 
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/sallybox/payment/final")
    public void processFinalPaymen(@RequestBody PaymentDTO paymentDTO) throws Exception{
        try{
            sqlService.updatePoints(paymentDTO.getUserId(), paymentDTO.getPointUsage(),paymentDTO.getPrice()-paymentDTO.getPointUsage());
            sqlService.insertPayment(paymentDTO);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    //강현 Controller
    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws Exception {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // 로그인 로직
        String token = sqlService.login(email, password); // 로그인 메서드 호출

        // System.out.println("token:" + token);

        if (token != null) {
            // 로그인 성공 시 토큰 발급
            return ResponseEntity.ok().body("Bearer " + token); // JWT 토큰 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이메일 또는 비밀번호가 일치하지 않습니다.");
        }
    }

    @PostMapping("/api/findEmail")
    public ResponseEntity<?> findEmail(@RequestBody FindEmailRequest findEmailRequest) throws Exception{
        // 로그인 로직

        CustomDTO dto = sqlService.findByName(findEmailRequest.getName(), findEmailRequest.getPhoneNumber());

        if(dto != null) {

            String maskedEmail = sqlService.maskEmail(dto.getEmail());

            if (maskedEmail != null) {
               
                return ResponseEntity.ok(maskedEmail);
    
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("입력하신 정보가 잘못 되었습니다.");
            }
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("입력하신 정보가 잘못 되었습니다.");
        }
    }

    @PostMapping("/api/allfindEmail")
    public ResponseEntity<?> allfindEmail(@RequestBody FindEmailRequest findEmailRequest) throws Exception{
        // 로그인 로직
        CustomDTO dto = sqlService.findByName(findEmailRequest.getName(), findEmailRequest.getPhoneNumber());

        if(dto != null) {

            // if (dto.getBirthday().equals(findEmailRequest.getBirthday())) {

            //     String email = dto.getEmail();
               
            //     return ResponseEntity.ok(email);
    
            // } else {
            //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("입력하신 정보가 잘못 되었습니다.");
            // }

            return ResponseEntity.ok(dto.getEmail());
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("입력하신 정보가 잘못 되었습니다.");
        }
    }

    @PostMapping("/api/send-sms")
    public ResponseEntity<?> sendSms (@RequestBody Map<String, String> body) { 
   
        String to = body.get("phoneNumber");

        Random rnd  = new Random();
        StringBuffer buffer = new StringBuffer();
        for (int i=0; i<6; i++) {
            buffer.append(rnd.nextInt(10));
        }
        String cerNum = buffer.toString();
        System.out.println("수신자 번호 : " + to);
        System.out.println("인증번호 : " + cerNum);

        sqlService.sendSms(to, cerNum);
         Map<String, String> response = new HashMap<>();
        response.put("message", "인증번호가 발송되었습니다.");
        response.put("code", cerNum);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/verificationCode")
    public ResponseEntity<?> verificationCode (@RequestBody Map<String, String> body) {

        String verificationCode = body.get("verificationCode");
        String code = body.get("code");

        System.out.println("사용자가 입력한 인증번호 : " + verificationCode);
        System.out.println("인증번호 : " + code);

        if (verificationCode.equals(code)) {
            return ResponseEntity.ok("인증에 성공하였습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증번호가 일치하지 않습니다.");
        }           
    }

    @PostMapping("/api/resetPassword")
    public ResponseEntity<?> updatePassword(@RequestParam String email, @RequestParam String password) {
        try {

            sqlService.updatePassword(email, password);
            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("비밀번호 변경에 실패했습니다.");
        }
    }

    @GetMapping("/api/nowmovies")
    public List<NowMoviesDTO> getNowMovies() {
        List<NowMoviesDTO> movies = sqlService.getNowMovies();
        return movies;
    }

    @GetMapping("/api/recommendmovies")
    public List<NowMoviesDTO> getRecommendMovies() {
        List<NowMoviesDTO> movies = sqlService.getReccommendMovies();
        return movies;
    }

    @GetMapping("/api/classicmovies")
    public List<NowMoviesDTO> getClassicMovies() {
        List<NowMoviesDTO> movies = sqlService.getClassicMovies();
        return movies;
    }

    //주용

    @PostMapping("/api/inquiries")
    public void createInquiry(@RequestBody InquiryRequest inquiryRequest) {
        sqlService.saveInquiry(inquiryRequest);
    }

    @GetMapping("/api/inquiries")
    public List<InquiryRequest> getAllInquiries() {
        return sqlService.getAllInquiries();
    }

    @DeleteMapping("/api/inquiries")
    public ResponseEntity<Void> deleteInquiry(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        sqlService.deleteInquiryByTitle(title);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/api/inquiries")
    public ResponseEntity<?> updateInquiry(@RequestBody InquiryRequest inquiryRequest) {
        
        try {
            sqlService.updateInquiry(inquiryRequest);
            return ResponseEntity.ok("게시물이 성공적으로 수정되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수정 중 오류 발생: " + e.getMessage());
        }
    }
    
    //지영 controller
    @GetMapping("/movies") // /movies 경로로 GET 요청을 처리
    public List<MovieDTO> fetchMovies() {
        List<MovieDTO> movieList = new ArrayList<>(); // 영화 리스트 초기화

        try {
            // 현재 상영 중 및 인기 영화 목록을 가져와서 리스트에 추가
            movieList.addAll(fetchMoviesByType("now_playing", NOW_PLAYING_TOTAL_PAGES));
            movieList.addAll(fetchMoviesByType("popular", POPULAR_TOTAL_PAGES));
        } catch (Exception e) {
            System.out.println("영화 가져오기 실패: " + e.getMessage()); // 에러 메시지 출력
            e.printStackTrace(); // 스택 트레이스 출력
            throw new RuntimeException(e); // 예외를 RuntimeException으로 감싸서 던짐
        }

        return movieList; // 영화 리스트 반환
    }


    @GetMapping("sallybox/movies/{movie_id}")
    public MovieDTO fetchMovieById(@PathVariable("movie_id") int movieId) {
        try {
            // 데이터베이스에서 영화 정보를 가져옴
            MovieDTO movie = movieService.findMovieById(movieId); 
            
            if (movie != null) {
                // genreIdsString을 genreIds 리스트로 변환
                if (movie.getGenreIdsString() != null && !movie.getGenreIdsString().isEmpty()) {
                    List<Integer> genreIds = Arrays.stream(movie.getGenreIdsString().split(","))
                                                .map(Integer::parseInt)
                                                .collect(Collectors.toList());
                    movie.setGenreIds(genreIds);
                }
                return movie;
            } else {
                // 영화가 데이터베이스에 없으면 에러 반환
                throw new RuntimeException("영화 정보가 데이터베이스에 존재하지 않습니다.");
            }
        } catch (Exception e) {
            System.out.println("영화 정보 가져오기 실패: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }


    private List<MovieDTO> fetchMoviesByType(String type, int totalPages) throws Exception {
        List<MovieDTO> movieList = new ArrayList<>(); // 영화 리스트 초기화

        // 각 페이지에 대해 영화 정보를 가져옴
        for (int i = 1; i <= totalPages; i++) {
            String requestUrl = String.format("https://api.themoviedb.org/3/movie/%s?api_key=%s&language=%s&region=%s&page=%d", 
                                               type, API_KEY, LANGUAGE, REGION, i);

            String response = restTemplate.getForObject(requestUrl, String.class); // API 호출
            JsonNode jsonResponse = objectMapper.readTree(response); // JSON 파싱
            JsonNode movies = jsonResponse.get("results"); // 영화 결과 노드 가져오기

            for (JsonNode movieJson : movies) {
                MovieDTO movie = createMovieFromJson(movieJson); // JSON에서 MovieDTO 객체 생성

                movieList.add(movie); // 리스트에 추가
                movieService.saveMovies(movie); // 영화 정보 저장
            }
        }

        return movieList; // 영화 리스트 반환
    }
   
   
    

    private MovieDTO createMovieFromJson(JsonNode movieJson) throws Exception {
        MovieDTO movie = new MovieDTO();
    
        // 영화 정보 설정 (null 체크 추가)
        movie.setMovieId(movieJson.has("id") && movieJson.get("id").isInt() ? movieJson.get("id").asInt() : 0);
        movie.setTitle(movieJson.has("title") && movieJson.get("title").isTextual() ? movieJson.get("title").asText() : "제목 없음");
        movie.setOverview(movieJson.has("overview") && movieJson.get("overview").isTextual() ? movieJson.get("overview").asText() : "내용 없음");
        movie.setPosterPath(movieJson.has("poster_path") && movieJson.get("poster_path").isTextual() ? movieJson.get("poster_path").asText() : "N/A");
        movie.setReleaseDate(movieJson.has("release_date") && movieJson.get("release_date").isTextual() ? movieJson.get("release_date").asText() : "N/A");
        movie.setOriginalLanguage(movieJson.has("original_language") && movieJson.get("original_language").isTextual() ? movieJson.get("original_language").asText() : "N/A");
        movie.setPopularity(movieJson.has("popularity") && movieJson.get("popularity").isDouble() ? movieJson.get("popularity").asDouble() : 0.0);
        movie.setVoteAverage(movieJson.has("vote_average") && movieJson.get("vote_average").isDouble() ? movieJson.get("vote_average").asDouble() : 0.0);
    
        // 장르 ID 설정
        if (movieJson.has("genre_ids") && movieJson.get("genre_ids").isArray()) {
            JsonNode genreIdsArray = movieJson.get("genre_ids");
            List<Integer> genreIds = new ArrayList<>();
            for (JsonNode genreId : genreIdsArray) {
                if (genreId.isInt()) {
                    genreIds.add(genreId.asInt());
                }
            }
            movie.setGenreIds(genreIds);
            String genreIdsString = String.join(",", genreIds.stream().map(String::valueOf).toArray(String[]::new));
            movie.setGenreIdsString(genreIdsString);
        }
    
        // 추가 정보 요청 (영어 버전)
        String enUsUrl = String.format(
            "https://api.themoviedb.org/3/movie/%d?api_key=%s&language=en-US&append_to_response=videos,runtime,release_dates", 
            movie.getMovieId(), API_KEY);
        String enUsResponse = restTemplate.getForObject(enUsUrl, String.class);
        JsonNode enUsJsonResponse = objectMapper.readTree(enUsResponse);
    
        // 런타임 설정
        if (enUsJsonResponse.has("runtime")) {
            movie.setRuntime(enUsJsonResponse.get("runtime").asText());
        }
    
        // 인증 정보 설정
        if (enUsJsonResponse.has("release_dates")) {
            JsonNode releaseDates = enUsJsonResponse.get("release_dates");
            if (releaseDates.has("results")) {
                JsonNode releaseResults = releaseDates.get("results");
                for (JsonNode result : releaseResults) {
                    if ("US".equals(result.path("iso_3166_1").asText())) {
                        JsonNode dates = result.path("release_dates");
                        for (JsonNode date : dates) {
                            String certification = date.path("certification").asText();
                            if (!certification.isEmpty()) {
                                movie.setCertification(mapCertification(certification));
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
    
        // 트레일러 설정
        if (enUsJsonResponse.has("videos")) {
            JsonNode videosJson = enUsJsonResponse.path("videos");
            if (videosJson.has("results")) {
                JsonNode videosArray = videosJson.path("results");
                for (JsonNode videoObj : videosArray) {
                    if ("Trailer".equals(videoObj.path("type").asText())) {
                        if (videoObj.has("key")) {
                            movie.setVideos(videoObj.path("key").asText());
                            break;
                        }
                    }
                }
            }
        }
    
        return movie;
    }
    
    // mapCertification 메서드를 동일하게 유지
    private String mapCertification(String certification) {
        if (certification == null || certification.isEmpty()) return "미정";
        switch (certification) {
            case "G":
            case "PG":
                return "전체 관람가";
            case "PG-13":
                return "12세 관람가";
            case "R":
                return "15세 관람가";
            case "NC-17":
            default:
                return "19세 관람가";
        }
    }

    /**
     * 특정 영화에 대한 위시리스트 상태를 확인하는 메서드
     * @param userId 임시로 설정된 user_id, 로그인 기능 추가 후 대체 필요
     * @param movieId 조회할 영화 ID
     * @return 위시리스트 상태 (isLiked: true/false)
     */
    @GetMapping("/sallybox/movies/{movie_id}/wishlist/status")
    public ResponseEntity<Map<String, Boolean>> checkWishlistStatus(
            @RequestParam("user_id") int userId, 
            @PathVariable("movie_id") int movieId) {  // movie_id는 URL에서 가져옴
        boolean isLiked = movieService.isMovieInWishlist(userId, movieId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isLiked", isLiked);
        return ResponseEntity.ok(response);
    }

    /**
     * 위시리스트에 영화 추가 또는 제거 (토글 방식)
     * @param wishlistDTO 유저 ID 및 영화 ID 정보를 담은 DTO
     * @return 위시리스트 추가 상태 (isLiked: true/false)
     */
    @PostMapping("/sallybox/movies/{movie_id}/wishlist/toggle")
    public ResponseEntity<Map<String, Boolean>> toggleWishlist(
            @PathVariable("movie_id") int movieId,   // URL에서 movie_id 가져옴
            @RequestParam("user_id") int userId,   // URL에서 movie_id 가져옴
            @RequestBody WishlistDTO wishlistDTO) {   // 요청의 본문에서 user_id 등 받아옴
     System.out.println(userId);
        // DTO의 movie_id를 URL에서 가져온 movie_id로 설정
        wishlistDTO.setMovieId(movieId);  
        wishlistDTO.setUserId(userId); // 로그인 미구현, 임시 user_id 설정
        MovieDTO dto = movieService.findMovieById(movieId);
        String genreIds=dto.getGenreIdsString();
        // 위시리스트에 있는지 확인 후 토글
        boolean isLiked = movieService.toggleWishlist(wishlistDTO.getUserId(), wishlistDTO.getMovieId(), genreIds);

        // 응답 생성
        Map<String, Boolean> response = new HashMap<>();
        response.put("isLiked", isLiked);
        return ResponseEntity.ok(response);
    }
        /*1108 첫날 jwt로 하면 되는거 시작임     
        //리뷰 저장 api
        @PostMapping("sallybox/movies/{movie_id}/reviews")
        public ResponseEntity<String> submitReview(
            @PathVariable int movie_id, 
            @RequestBody ReviewsDTO reviewsDTO) {
            try {
                // 수신된 리뷰 내용 출력 (null 체크)
                System.out.println("리뷰 텍스트: " + reviewsDTO.getReviewText());

                // 리뷰 내용이 10글자 미만일 경우 예외 발생
                if (reviewsDTO.getReviewText() == null || reviewsDTO.getReviewText().length() < 10) {
                    return new ResponseEntity<>("리뷰는 최소 10글자 이상이어야 합니다.", HttpStatus.BAD_REQUEST);
                }

                // 닉네임이 null일 경우 기본 닉네임 설정
                if (reviewsDTO.getNickname() == null || reviewsDTO.getNickname().isEmpty()) {
                    reviewsDTO.setNickname("기본 닉네임"); // 필요에 따라 기본 닉네임 설정
                }
                
                reviewsDTO.setMovieId(movie_id); // 영화 ID 설정
                reviewsDTO.setUserId(1); // JWT가 구현되면 이 부분은 주석처리할 것
                movieService.saveReview(reviewsDTO); // 리뷰 저장
                return new ResponseEntity<>("리뷰 작성이 완료되었습니다.", HttpStatus.OK);
            } catch (DataAccessException dae) {
                return new ResponseEntity<>("데이터베이스 오류 발생: " + dae.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            } catch (NullPointerException npe) {
                return new ResponseEntity<>("필수 값 누락: " + npe.getMessage(), HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                return new ResponseEntity<>("알 수 없는 오류 발생: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


    // 리뷰 수정 API
    @PutMapping("sallybox/movies/{movie_id}/reviews/{review_id}")
    public ResponseEntity<String> updateReview(
        @PathVariable int movie_id,
        @PathVariable int review_id, 
        @RequestBody ReviewsDTO reviewsDTO) {
        try {
            reviewsDTO.setMovieId(movie_id); // 영화 ID 설정
            reviewsDTO.setReviewId(review_id); // 리뷰 ID 설정
            reviewsDTO.setUserId(1); // JWT가 구현되면 이 부분은 주석처리할 것

            // nickname이 null이거나 비어있는 경우 기본값 설정
            if (reviewsDTO.getNickname() == null || reviewsDTO.getNickname().isEmpty()) {
                reviewsDTO.setNickname("익명");
            }

            movieService.updateReview(reviewsDTO); // 리뷰 수정
            return new ResponseEntity<>("리뷰 수정이 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("리뷰 수정 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 리뷰 삭제 API
    @DeleteMapping("/sallybox/movies/{movie_id}/reviews/{review_id}")
    public ResponseEntity<String> deleteReview(
        @PathVariable int movie_id,
        @PathVariable int review_id,
        @RequestParam(required = false) Integer user_id) {
        try {
            if (user_id == null) {
                user_id = 1; // JWT가 구현되기 전까지는 임시로 user_id = 1 설정
            }

            movieService.deleteReview(review_id, user_id); // 리뷰 삭제
            return new ResponseEntity<>("리뷰가 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // 또는 logger를 사용할 수 있습니다.
            return new ResponseEntity<>("리뷰 삭제 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
         */ 
        
    // 리뷰 저장 API
    @PostMapping("sallybox/movies/{movie_id}/reviews")
    public ResponseEntity<String> submitReview(
        @RequestBody ReviewsDTO reviewsDTO
       ) { //RequestBody 넘어온걸 reviewsDTO에 하겠다 

            // System.out.println(userId);
            // System.out.println(movie_id);
        try {
            // 리뷰 텍스트가 10글자 이상인지 확인
            // if (reviewsDTO.getReviewText() == null || reviewsDTO.getReviewText().length() < 10) {
            //     return new ResponseEntity<>("리뷰는 최소 10글자 이상이어야 합니다.", HttpStatus.BAD_REQUEST);
            // }
            // reviewsDTO.setUserId(userId);
            // reviewsDTO.setMovieId(movie_id); // 영화 ID 설정
            movieService.saveReview(reviewsDTO); // 리뷰 저장
            return new ResponseEntity<>("리뷰 작성이 완료되었습니다.", HttpStatus.OK);
        } catch (DataAccessException dae) {
            return new ResponseEntity<>("데이터베이스 오류 발생: " + dae.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("알 수 없는 오류 발생: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 리뷰 수정 API
    @PutMapping("sallybox/movies/{movie_id}/reviews/{review_id}")
    public ResponseEntity<String> updateReview(
        @PathVariable int movie_id,
        @PathVariable int review_id,
        @RequestBody ReviewsDTO reviewsDTO) {
        try {
            reviewsDTO.setMovieId(movie_id); // 영화 ID 설정
            reviewsDTO.setReviewId(review_id); // 리뷰 ID 설정
            movieService.updateReview(reviewsDTO); // 리뷰 수정
            return new ResponseEntity<>("리뷰 수정이 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // 예외 상세 정보 출력
            return new ResponseEntity<>("리뷰 수정 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 리뷰 삭제 API
    @DeleteMapping("/sallybox/movies/{movie_id}/reviews/{review_id}")
    public ResponseEntity<String> deleteReview(
        @PathVariable int movie_id,
        @PathVariable int review_id,
        @RequestParam int user_id) { // 삭제 요청 시 user_id를 전달받음
        try {
            movieService.deleteReview(review_id, user_id); // 리뷰 삭제
            return new ResponseEntity<>("리뷰가 삭제되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("리뷰 삭제 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //부킹에 있는지 확인
    @GetMapping("sallybox/movies/{movie_id}/reviews/checkBooking")
    public ResponseEntity<Boolean> checkBooking(
        @RequestParam int userId,
        @RequestParam int movieId) {
        boolean exists = movieService.checkBookingExists(userId, movieId);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }
   

    // 영화 ID로 리뷰 목록 가져오기 API
    @GetMapping("sallybox/movies/{movie_id}/reviews")
    public ResponseEntity<List<ReviewsDTO>> fetchReviewsByMovieId(@PathVariable int movie_id) {
        List<ReviewsDTO> reviews = movieService.getReviewsByMovieId(movie_id); // 리뷰 목록 가져오기
         // 리뷰 목록이 제대로 반환되고 있는지 확인하기 위한 로그
    if (reviews != null) {
        System.out.println("리뷰 개수: " + reviews.size());
        for (ReviewsDTO review : reviews) {
            System.out.println("리뷰: " + review.getReviewText()); // 각 리뷰의 내용 출력
        }
    } else {
        System.out.println("리뷰 목록이 없습니다.");
    }
        return ResponseEntity.ok(reviews);
    }


    //예매 페이지 컨트롤러!!!!!
    //영화 상세페이지에서 예매하기 버튼 클릭시 movie_id를 가지고 감
    @PostMapping("/sallybox/reserv/ticketing")
    public ResponseEntity<String> bookTicket(@RequestBody MovieDTO movieDTO) {
        try {
            // 예매 처리 로직을 작성합니다 (DB에 저장하거나 필요한 작업 수행)
            System.out.println("예매 정보 (MovieDTO): " + movieDTO.getMovieId());  // movieId 확인
            System.out.println("예매 정보: " + movieDTO.toString());

            // 성공적으로 예매 정보를 처리한 경우
            return ResponseEntity.ok("예매가 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            // 예외 발생 시 오류 응답 반환
            return new ResponseEntity<>("예매 처리 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //예매페이지~~~~~~~~~~~~~~

    //서울 클릭하면 그 안에 있는 영화관을 db에서 가져오는 코드
    @GetMapping("/sallybox/reserv/cinemas/{region}")
    public List<CinemaDTO> getCinemasByRegion(@PathVariable("region") String region) {
        // region 값에 '%' 추가
        String formattedRegion = "%" + region + "%";
        return movieService.getCinemasByRegion(formattedRegion);
    }


    @GetMapping("/sallybox/cinemajy/{cinema_id}")
    public CinemaScheduleDTO getCinemaAndSchedules(@PathVariable("cinema_id") int cinema_id) throws Exception {
        // 1. 영화관 정보를 가져옵니다.
        CinemaDTO cinemaDTO = movieService.getCinemaInfojy(cinema_id);
        
        //System.out.println("Cinema: " + cinema_id);
        // 2. 해당 영화관의 상영 일정을 가져옵니다.
        List<SchedulesTheaterDTO> schedules = movieService.getSchedulesTheaterjy(cinema_id);
        //System.out.println("Schedules: " + schedules);

        // 3. 상영 일정 목록을 날짜별로 그룹화하여 맵 형태로 변환합니다. -> 내부에서 날짜별로 스케줄을 그룹화 하는 로직으로 데이터베이스 쿼리 없이 자바 코드로 처리 됩니다
        Map<String, List<SchedulesTheaterDTO>> scheduleMap = movieService.groupCinemaSchedules(schedules);
        //System.out.println("Schedule Map: " + scheduleMap);
        // 4. CinemaScheduleDTO 객체에 영화관 정보와 일정 목록을 담아 반환합니다.
        return new CinemaScheduleDTO(cinemaDTO, scheduleMap);
    }


    //현재 상영작 20개
    @GetMapping("/sallybox/nowmovies/{movie_id}")
    public NowMovieDTO fetchNowMovieById(@PathVariable("movie_id") int movieId) {
        try {
            NowMovieDTO nowMovie = movieService.getNowMovieById(movieId);
            if (nowMovie != null) {
                // genreIdsString을 genreIds 리스트로 변환
                if (nowMovie.getGenreIdsString() != null && !nowMovie.getGenreIdsString().isEmpty()) {
                    List<Integer> genreIds = Arrays.stream(nowMovie.getGenreIdsString().split(","))
                                                    .map(Integer::parseInt)
                                                    .collect(Collectors.toList());
                    nowMovie.setGenreIds(genreIds);
                }
                return nowMovie;
            } else {
                // 영화가 데이터베이스에 없으면 에러 반환
                throw new RuntimeException("영화 정보가 데이터베이스에 존재하지 않습니다.");
            }
        } catch (Exception e) {
            System.out.println("영화 정보 가져오기 실패: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    
    }
    
    // movie_id의 존재 여부를 확인하는 api추가
    @GetMapping("/sallybox/nowmovies/exists/{movie_id}")
    public boolean checkIfMovieExists(@PathVariable("movie_id") int movieId) {
        return movieService.getNowMovieById(movieId) != null;
    }

    //선호 controller
    @GetMapping("/sallybox/mypage/{userId}")
    public ResponseEntity<Map<String, Object>> getCustomerInfoAndWishlist(@PathVariable("userId") int userId) throws Exception{
     
        CustomerDTO customerInfo = sqlService.getCustomerInfo(userId);
        List<MyMovieDTO> wishlistMovies = sqlService.getWishlistMovies(userId);

        System.out.println("wishlistMovies--------------------"+wishlistMovies);
        
        Map<String, Object> response = new HashMap<>();
        response.put("customerInfo", customerInfo);
        response.put("wishlistMovies", wishlistMovies);
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/sallybox/mypage/{userId}/{movieId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable int userId, @PathVariable int movieId) throws Exception {
        boolean removed = sqlService.removeFromWishlist(userId, movieId);
        if (removed) {
            return ResponseEntity.ok().body("영화가 위시리스트에서 삭제되었습니다.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }   
    
    @PutMapping("/sallybox/mypage/deactivate")
    public ResponseEntity<?> deactivateUser(@RequestBody UserDeactivationDTO dto) {

        //System.out.println("Received userId: " + dto.getUserId());
        //System.out.println("Received status: " + dto.getStatus());

        boolean result = sqlService.deactivateUser(dto.getUserId());

        if (result) {
            return ResponseEntity.ok().body("{\"success\": true}");
        } else {
            return ResponseEntity.badRequest().body("{\"success\": false}");
        }
    }

    @PostMapping("/sallybox/auth/logout")
    public ResponseEntity<?> logout() {
        // 로그아웃 로직 구현
        return ResponseEntity.ok().body("{\"success\": true}");
    }

    @PutMapping("/sallybox/mypage/editprofile")
    public ResponseEntity<?> updateNickname(@RequestBody ProfileDTO profileDTO) {
        try {
            ProfileDTO updatedProfile = sqlService.updateNickname(profileDTO.getUserId(), profileDTO.getNickname());
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", updatedProfile);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "닉네임 업데이트에 실패했습니다: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PutMapping("/sallybox/mypage/update")
    public ResponseEntity<String> updateCustomer(@RequestBody UserUpdateDTO userUpdateDTO) {
        try {
            boolean updated = sqlService.updateCustomer(userUpdateDTO);
            if (updated) {
                return ResponseEntity.ok("Customer updated successfully");
            } else {
                return ResponseEntity.badRequest().body("Failed to update customer");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update customer: " + e.getMessage());
        }
    }

    @GetMapping("/sallybox/mypage/booking/{userId}")
    public List<MyBookingDTO> getBookings(@PathVariable int userId) {
        return sqlService.getBookingsByUserId(userId);
    }

    @GetMapping("sallybox/mypage/payment/{userId}")
    public ResponseEntity<List<MyPayDTO>> getPayments(@PathVariable int userId) {

        List<MyPayDTO> payments = sqlService.getPaymentsByUserId(userId);

        return ResponseEntity.ok(payments);
    }
    
     
    @PostMapping("/sallybox/mypage/cancel")
    public ResponseEntity<String> cancelBooking(
        @RequestParam int userId,
        @RequestParam Long bookingNum,
        @RequestParam int pointUsage
    ) {
        try {
            sqlService.cancelBooking(userId, bookingNum, pointUsage);
            return ResponseEntity.ok("예매가 성공적으로 취소되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("예매 취소 중 오류가 발생했습니다.");
        }
    }

        
}
