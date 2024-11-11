package com.example.demo.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.example.demo.dto.request.auth.SignUpRequestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter //변수들getter생성
@NoArgsConstructor  //매개변수가 없는 생성자 자동으로 만들어줌
@AllArgsConstructor  //지정하는 모든 필드에 대해 생성자 만들어줌
@Entity(name="users")
@Table(name="users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_seq")
    @SequenceGenerator(name = "users_seq", sequenceName = "users_seq", allocationSize = 1)
    @Column(name="user_id")//컬럼명 정해줌
    private int userId;
    private String email;
    private String password;
    @Column(name="phone_number")
    private String phoneNumber;
    private String name;
    @Column(name="birth_date")
    private String birthDate;
    @Column(name="gender_code")
    private String genderCode;
    private String nickname;
    @Column(name="registration_date")
    private LocalDateTime registrationDate;
    @Column(length = 1, nullable = false)
    private String status = "Y";
    private String role;
    private String type;
    @Column(nullable = false, columnDefinition = "NUMBER(10,2) DEFAULT 100")
    private BigDecimal points;

    @Column(insertable = false, updatable = false)
    private String grade;

    public UserEntity (SignUpRequestDto dto){
        
        this.userId = dto.getId();
        this.password = dto.getPassword();
        this.email = dto.getEmail();
        this.phoneNumber =dto.getPhoneNumber();
        this.name=dto.getName();
        this.birthDate= dto.getBirthDate();
        this.genderCode = dto.getGenderCode();
        this.nickname=dto.getNickname();
        this.registrationDate = LocalDateTime.now();
        this.status = "Y";
        this.role = "ROLE_USER";
        this.type="app";
        this.points=new BigDecimal("100.00");
        
    }

    public UserEntity(int userId, String email,String name, String nickname, String type){
        this.userId = userId;
        this.password = "password";
        this.email = email;
        this.phoneNumber ="010-0000-0000";
        this.name=name;
        this.birthDate= "000000";
        this.genderCode = "1";
        this.nickname=nickname;
        this.registrationDate = LocalDateTime.now();
        this.status = "Y";
        this.role = "ROLE_USER";
        this.type=type;
        this.points=new BigDecimal("100.00");
    }

    public UserEntity(int hashedId, String email,String name,String nickname,String phoneNumber, String type){
        this.userId = hashedId;
        this.password = "password";
        this.email = email;
        this.phoneNumber =phoneNumber;
        this.name=name;
        this.birthDate= "000000";
        this.genderCode = "1";
        this.nickname=nickname;
        this.registrationDate = LocalDateTime.now();
        this.status = "Y";
        this.role = "ROLE_USER";
        this.type=type;
        this.points=new BigDecimal("100.00");
    }

    public BigDecimal getPoints() {
        return points;
    }

    public void setPoints(BigDecimal points) {
        this.points = points;
    }

    // grade의 getter (setter는 제공하지 않음)
    public String getGrade() {
        return grade;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
