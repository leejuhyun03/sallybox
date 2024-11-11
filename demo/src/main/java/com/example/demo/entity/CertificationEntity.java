package com.example.demo.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="certification")
@Table(name="certification")
public class CertificationEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "certification_seq")
    @SequenceGenerator(name = "certification_seq", sequenceName = "CERTIFICATION_SEQ", allocationSize = 1)
    private int userId;
    private String email;
    private String certificationNumber;

}
