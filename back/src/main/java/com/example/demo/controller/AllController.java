package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import com.example.demo.DTO.JH.CinemaDTO;
import com.example.demo.DTO.JH.CinemaScheduleDTO;
import com.example.demo.DTO.JH.SchedulesTheaterDTO;
import com.example.demo.DTO.JH.SeatsDTO;
import com.example.demo.DTO.JY.InquiryRequest;
import com.example.demo.DTO.KH.CustomDTO;
import com.example.demo.DTO.KH.FindEmailRequest;
import com.example.demo.DTO.KH.LoginRequest;
import com.example.demo.service.SqlService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class AllController {
    
    @Autowired
    private SqlService sqlService;

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
    
    //강현 Controller
    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws Exception {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        System.out.println("email: " + email);
        System.out.println("password; " + password);

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
        CustomDTO dto = sqlService.findByName(findEmailRequest.getName());

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
        CustomDTO dto = sqlService.findByName(findEmailRequest.getName());

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
            System.out.println("email: " + email);
            System.out.println("newPassword: " + password);

            sqlService.updatePassword(email, password);
            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("비밀번호 변경에 실패했습니다.");
        }
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

    
    
    
}
