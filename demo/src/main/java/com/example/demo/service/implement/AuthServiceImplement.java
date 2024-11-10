package com.example.demo.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dto.response.auth.CheckCertificationResponseDto;
import com.example.demo.dto.response.auth.EmailCertificationResponseDto;
import com.example.demo.dto.response.auth.IdCheckResponseDto;
import com.example.demo.dto.response.auth.SignUpResponseDto;
import com.example.demo.entity.CertificationEntity;
import com.example.demo.entity.UserEntity;
import com.example.demo.provider.EmailProvider;
import com.example.demo.common.CertificationNumber;
import com.example.demo.dto.request.auth.CheckCertificationRequestDto;
import com.example.demo.dto.request.auth.EmailCertificationRequestDto;
import com.example.demo.dto.request.auth.IdCheckRequestDto;
import com.example.demo.dto.request.auth.SignUpRequestDto;
import com.example.demo.dto.response.ResponseDto;
import com.example.demo.repository.CertificationRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService{

    private final UserRepository userRepository;

    private final EmailProvider emailProvider;
    private final CertificationRepository certificationRepository;

    private  PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    //의존성 주입 ㄴㄴ
    
    @Override
    public ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto) {

        try {
            String email = dto.getEmail();
            boolean isExistEmail = userRepository.existsByEmail(email);
            if(isExistEmail) return IdCheckResponseDto.duplicateId();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return IdCheckResponseDto.success();
    }

    @Override
    public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestDto dto) {
        
        try {
            //int userId = dto.getId();
            String email = dto.getEmail();

            //존재하는 아이디 인지 확인
            //userId는 회원가입 시 자동으로 생성되는 값이므로, 이메일 인증 단계에서는 아직 존재하지 않습니다. 따라서 existsById(userId) 체크는 필요하지 않음.

            //존재하는 이메일인지 확인

            
            boolean isExistEmail = userRepository.existsByEmail(email);
            if(isExistEmail) return EmailCertificationResponseDto.duplicateId();

        
            //CertificationNumber만들기
            String certificationNumber = CertificationNumber.getCertificationNumber();

            //System.out.println("111" + certificationNumber);


            //메일전송하기
            boolean isSuccessed = emailProvider.sendCertificationMail(email, certificationNumber);
            if(!isSuccessed) return EmailCertificationResponseDto.mailSendFail();

            //전송결과 저장
            //CertificationEntity certificationEntity = new CertificationEntity(userId,email,certificationNumber);

            // 전송 결과 저장
            CertificationEntity certificationEntity = new CertificationEntity();
            certificationEntity.setEmail(email);
            certificationEntity.setCertificationNumber(certificationNumber);
            
            // 저장 시 자동으로 userId가 생성됩니다.
            certificationEntity = certificationRepository.save(certificationEntity);
            
            // 생성된 userId를 활용할 수 있습니다.
            //int generatedUserId = certificationEntity.getUserId();

            // 여기서 generatedUserId를 활용하여 추가적인 로직을 수행할 수 있습니다.
            // 예: 로그에 기록하거나, 다른 처리를 수행
            
            certificationRepository.save(certificationEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EmailCertificationResponseDto.success();
    }

    @Override
    public ResponseEntity<? super CheckCertificationResponseDto> checkCertification(CheckCertificationRequestDto dto) {
        
        try {

            //int id = dto.getId();
            String email = dto.getEmail();
            String certificationNumber = dto.getCertificationNumber();

           // System.out.println("email:"+email);

            CertificationEntity certificationEntity = certificationRepository.findByEmail(email);

            if(certificationEntity==null) return CheckCertificationResponseDto.certificationFail();
            
            System.out.println("certificationEntity.getCertificationNumber():"+certificationEntity.getCertificationNumber());

            boolean isMatched = certificationEntity.getEmail().equals(email) && certificationEntity.getCertificationNumber().equals(certificationNumber);

            if(!isMatched) return CheckCertificationResponseDto.certificationFail();

            
            System.out.println("certificationNumber호출---------------------" + certificationNumber);
            
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return CheckCertificationResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        
        try {
            String email =dto.getEmail();
            

            boolean isExistEmail = userRepository.existsByEmail(email);
            if (isExistEmail) return SignUpResponseDto.duplicateId();

            //int userId = dto.getId();
            String certificationNumber = dto.getCertificationNumber();

            CertificationEntity certificationEntity = certificationRepository.findByEmail(email);
            boolean isMatched = 
                certificationEntity.getEmail().equals(email) && 
                certificationEntity.getCertificationNumber().equals(certificationNumber);
            if (!isMatched) 
                return SignUpResponseDto.certificationFail();
                
            String password  = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            //String phoneNumber = dto.getPhoneNumber();
            //String name = dto.getName();
            //String nickname = dto.getNickname();

            UserEntity userEntity= new UserEntity(dto);
            userRepository.save(userEntity);

            //certificationRepository.delete(certificationEntity);
            certificationRepository.deleteByEmail(email);
            
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }


    
    
    
}
