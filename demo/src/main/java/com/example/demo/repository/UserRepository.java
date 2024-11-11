package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserEntity;

@Repository //java bean 등록.. //annotation component와 하는 역할 동일
public interface UserRepository extends JpaRepository<UserEntity,Integer>{

    boolean existsByEmail(String email);

    UserEntity findByEmail(String email);
    
    @Query(value = "SELECT users_seq.NEXTVAL FROM DUAL", nativeQuery = true)
    public int getNextUserId();

   

    
}
