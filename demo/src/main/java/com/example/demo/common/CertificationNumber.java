package com.example.demo.common;
//네자리의 certificationNumber만들기
//사실 AuthServiceImplement에 하나의 메소드로 만들어도 됨(대신 private로 수정)
public class CertificationNumber {

    public static String getCertificationNumber () {

        String certificationNumber ="";

        for(int count =0; count<4; count++) certificationNumber += (int) (Math.random() *10);

        return certificationNumber;
    }
}
