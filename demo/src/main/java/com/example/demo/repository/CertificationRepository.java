package com.example.demo.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CertificationEntity;

@Repository
public interface CertificationRepository extends JpaRepository<CertificationEntity,Integer>{

    CertificationEntity findByEmail(String email);

    @Transactional
    //여러 데이터베이스 작업을 하나의 논리적 단위로 묶어 모두 성공하거나 모두 실패하도록 보장
    void deleteByEmail(String email);

    
}
