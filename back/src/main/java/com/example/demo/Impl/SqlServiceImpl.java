<<<<<<< HEAD
package com.example.demo.Impl;

// import java.util.List;
// import java.util.Map;
import java.util.stream.Collectors;
import java.util.*;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;
import com.example.demo.DTO.JH.SeatsDTO;
import com.example.demo.DTO.JY.InquiryRequest;
import com.example.demo.DTO.KH.CustomDTO;
import com.example.demo.mapper.SqlMapper;
import com.example.demo.service.SqlService;
import com.example.demo.util.JwtUtil;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Service
public class SqlServiceImpl implements SqlService{

    @Autowired
    private SqlMapper sqlMapper;

    @Override
    public CinemaDTO getCinemaInfo(int cinema_id) throws Exception {
        return sqlMapper.getCinemaInfo(cinema_id);
    }

    @Override
    public List<SchedulesTheaterDTO> getSchedulesTheater(int cinema_id) throws Exception {
        
        return sqlMapper.getSchedulesTheater(cinema_id);
    }

    @Override
    public Map<String, List<SchedulesTheaterDTO>> groupCinemaSchedules(List<SchedulesTheaterDTO> schedules)
            throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return schedules.stream().collect(Collectors.groupingBy(schedule -> {
            LocalDate localDate = schedule.getCreated().toInstant().atZone(
                java.time.ZoneId.systemDefault()).toLocalDate();
                return localDate.format(formatter);
        }));

    }//key는 created,value = created에 속하는 ScheduleDTO의 객체들의 List

    @Override
    public List<SeatsDTO> getSeatsbyTheaterId(int theater_id, int schedule_id) throws Exception {
        Map<String,Object> params = new HashMap<>();
        params.put("theater_id", theater_id);
        params.put("schedule_id", schedule_id);
        return sqlMapper.getSeatsbyTheaterId(params);
    }


    //강현 ServiceImpl

	@Autowired
	private PasswordEncoder passwordEncoder; // 비밀번호 인코더

	@Autowired
	private JwtUtil jwtUtil; // JwtUtil 임포트

    @Override
    public CustomDTO findByEmail(String email) {
        return sqlMapper.findByEmail(email);
    }

	@Override
	public CustomDTO findByName(String name) {
		return sqlMapper.findByName(name); // 이메일 조회
	}
	
	@Override
	public String maskEmail(String email) {
		
		String[] parts = email.split("@");
		String username = parts[0];
		String domain = parts[1];

		if (username.length() > 2) {
			StringBuilder maskedUsername = new StringBuilder(username.substring(0, 2));
			for (int i = 2; i < username.length(); i++) {
				maskedUsername.append("*"); // 반복문으로 '*' 추가
			}
			return maskedUsername.toString() + "@" + domain;
		} else {
			return email; // 사용자 이름이 2글자 이하일 경우 변경 없음
		}
	}

	@Override
	public String login(String email, String password) {
		CustomDTO dto = sqlMapper.findByEmail(email);

		// 비밀번호 검증
		boolean matches = dto != null && passwordEncoder.matches(password, dto.getPassword());

		if (matches) {
			// 비밀번호가 일치하는 경우 JWT 토큰 생성
			return jwtUtil.generateToken(dto.getEmail(), dto.getUserid(), dto.getNickname()); // 이메일과 userId를 사용하여 JWT 토큰 생성
		}
		return null; // 로그인 실패
	}


	@Value("${coolsms.api.key}") 
    private String API_KEY;

    @Value("${coolsms.api.secretkey}") 
    private String API_SECRET_KEY; 

    @Value("${coolsms.from.number}") 
    private String FROM;

	@Override
    public void sendSms(String to, String cerNum) {
        Message message = new Message();
        message.setFrom(FROM); // 발신자
        message.setTo(to); // 수신자
        message.setText("[SallyBox] 문자 본인인증 서비스 : 인증번호는 " + "[" + cerNum + "]" + " 입니다."); // 문자 내용

        DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(API_KEY, API_SECRET_KEY,  "https://api.coolsms.co.kr");

        try {
            SingleMessageSentResponse response = messageService.sendOne(new SingleMessageSendingRequest(message));
            
        } catch (Exception e) {
             System.out.println("SMS 발송 중 예외 발생: " + e.getMessage());
            e.printStackTrace();
        }

    }

	@Override
	public void updatePassword(String email, String password) {
		sqlMapper.updatePassword(email, password);
	}
    

    // 주용 ServiceImpl
   
    @Override
    public void saveInquiry(InquiryRequest inquiryRequest) {
        sqlMapper.insertInquiry(inquiryRequest);
    }

    @Override
    public List<InquiryRequest> getAllInquiries() {
        return sqlMapper.selectAllInquiries();
    }

    @Override
    public void deleteInquiryByTitle(String title) {
        sqlMapper.deleteInquiryByTitle(title); // 제목으로 삭제 메서드 호출
    }

    @Override
    public void updateInquiry(InquiryRequest inquiryRequest) {
        sqlMapper.updateInquiry(inquiryRequest); // 수정 메서드 호출
    }
}
=======
package com.example.demo.Impl;

// import java.util.List;
// import java.util.Map;
import java.util.stream.Collectors;
import java.util.*;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.JH.BookingDTO;
import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JH.PaymentDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;
import com.example.demo.DTO.JH.SeatsDTO;
import com.example.demo.DTO.JY.InquiryRequest;
import com.example.demo.DTO.KH.CustomDTO;
import com.example.demo.DTO.KH.NowMoviesDTO;
import com.example.demo.mapper.SqlMapper;
import com.example.demo.service.SqlService;
import com.example.demo.util.JwtUtil;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Service
public class SqlServiceImpl implements SqlService{

    @Autowired
    private SqlMapper sqlMapper;

    @Override
    public CinemaDTO getCinemaInfo(int cinema_id) throws Exception {
        return sqlMapper.getCinemaInfo(cinema_id);
    }

    @Override
    public List<SchedulesTheaterDTO> getSchedulesTheater(int cinema_id) throws Exception {
        
        return sqlMapper.getSchedulesTheater(cinema_id);
    }

    @Override
    public Map<String, List<SchedulesTheaterDTO>> groupCinemaSchedules(List<SchedulesTheaterDTO> schedules)
            throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return schedules.stream().collect(Collectors.groupingBy(schedule -> {
            LocalDate localDate = schedule.getCreated().toInstant().atZone(
                java.time.ZoneId.systemDefault()).toLocalDate();
                return localDate.format(formatter);
        }));

    }//key는 created,value = created에 속하는 ScheduleDTO의 객체들의 List

    @Override
    public List<SeatsDTO> getSeatsbyTheaterId(int theater_id, int schedule_id) throws Exception {
        Map<String,Object> params = new HashMap<>();
        params.put("theater_id", theater_id);
        params.put("schedule_id", schedule_id);
        return sqlMapper.getSeatsbyTheaterId(params);
    }

    @Override
    public Integer getPoints(int user_id) throws Exception {
        return sqlMapper.getPoints(user_id);
    }

    @Override
    public void insertBooking(BookingDTO bookingDTO) {
        sqlMapper.insertBooking(bookingDTO);
    }

    @Override
    public void insertPayment(PaymentDTO paymentDTO) {
        sqlMapper.insertPayment(paymentDTO);
    }

    @Override
    public void updatePoints(int userId, int pointUsage,int totalPrice) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        params.put("pointUsage", pointUsage);
        params.put("totalPrice", totalPrice);

        double grade = this.getGrade(userId);
        params.put("grade", grade);

        sqlMapper.updatePoints(params);
    }

    @Override
    public double getGrade(int userId) {
            
        String grade = sqlMapper.getGrade(userId);

        switch(grade.toLowerCase()) {
            case "vip" : return 0.05;
            case "vvip" : return 0.08;
            case "gold" : return 0.12;
            case "platinum" : return 0.18;
            default : return 0.05;
        }
    }
    //강현 ServiceImpl

	@Autowired
	private PasswordEncoder passwordEncoder; // 비밀번호 인코더

	@Autowired
	private JwtUtil jwtUtil; // JwtUtil 임포트

    @Override
    public CustomDTO findByEmail(String email) {
        return sqlMapper.findByEmail(email);
    }

	@Override
	public CustomDTO findByName(String name) {
		return sqlMapper.findByName(name); // 이메일 조회
	}
	
	@Override
	public String maskEmail(String email) {
		
		String[] parts = email.split("@");
		String username = parts[0];
		String domain = parts[1];

		if (username.length() > 2) {
			StringBuilder maskedUsername = new StringBuilder(username.substring(0, 2));
			for (int i = 2; i < username.length(); i++) {
				maskedUsername.append("*"); // 반복문으로 '*' 추가
			}
			return maskedUsername.toString() + "@" + domain;
		} else {
			return email; // 사용자 이름이 2글자 이하일 경우 변경 없음
		}
	}

	@Override
	public String login(String email, String password) {
		CustomDTO dto = sqlMapper.findByEmail(email);

		// 비밀번호 검증
		boolean matches = dto != null && passwordEncoder.matches(password, dto.getPassword());

		if (matches) {
			// 비밀번호가 일치하는 경우 JWT 토큰 생성
			return jwtUtil.generateToken(dto.getEmail(), dto.getUserid(), 
                                         dto.getNickname(), dto.getName(),
                                         dto.getPoints()); // 이메일과 userId를 사용하여 JWT 토큰 생성
		}
		return null; // 로그인 실패
	}


	@Value("${coolsms.api.key}") 
    private String API_KEY;

    @Value("${coolsms.api.secretkey}") 
    private String API_SECRET_KEY; 

    @Value("${coolsms.from.number}") 
    private String FROM;

	@Override
    public void sendSms(String to, String cerNum) {
        Message message = new Message();
        message.setFrom(FROM); // 발신자
        message.setTo(to); // 수신자
        message.setText("[SallyBox] 문자 본인인증 서비스 : 인증번호는 " + "[" + cerNum + "]" + " 입니다."); // 문자 내용

        DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(API_KEY, API_SECRET_KEY,  "https://api.coolsms.co.kr");

        try {
            SingleMessageSentResponse response = messageService.sendOne(new SingleMessageSendingRequest(message));
            
        } catch (Exception e) {
             System.out.println("SMS 발송 중 예외 발생: " + e.getMessage());
            e.printStackTrace();
        }

    }

	@Override
	public void updatePassword(String email, String password) {
		sqlMapper.updatePassword(email, password);
	}

    @Override
    public List<NowMoviesDTO> getNowMovies() {
        return sqlMapper.getNowMovies();
    }
    
    @Override
    public List<NowMoviesDTO> getReccommendMovies() {
        return sqlMapper.getReccommendMovies();
    }

    @Override
    public List<NowMoviesDTO> getClassicMovies() {
        return sqlMapper.getClassicMovies();
    }

    // 주용 ServiceImpl
   
    @Override
    public void saveInquiry(InquiryRequest inquiryRequest) {
        sqlMapper.insertInquiry(inquiryRequest);
    }

    @Override
    public List<InquiryRequest> getAllInquiries() {
        return sqlMapper.selectAllInquiries();
    }

    @Override
    public void deleteInquiryByTitle(String title) {
        sqlMapper.deleteInquiryByTitle(title); // 제목으로 삭제 메서드 호출
    }

    @Override
    public void updateInquiry(InquiryRequest inquiryRequest) {
        sqlMapper.updateInquiry(inquiryRequest); // 수정 메서드 호출
    }

}
>>>>>>> 994e26a085e7990e950add20e7965335133f8c85
