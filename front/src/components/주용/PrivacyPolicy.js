import React, { useState } from "react";
import axios from "axios"; // axios 임포트
import "../../css/jy/tab.css";
import "../../css/jy/Gogakregistration.css";
import "../../css/jy/Gogaksenter.css";

const PrivacyPolicy = ({ onAgreementChange }) => {
  const [isAgreed, setIsAgreed] = useState(false); // 동의 상태를 관리

  const handleAgreementChange = (e) => {
    const isChecked = e.target.id === "radio10"; // 동의 라디오 버튼 체크 여부
    setIsAgreed(isChecked); // 동의 여부 업데이트
    onAgreementChange(isChecked); // 부모 컴포넌트에 동의 상태 전달
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/agreement', {
        isAgreed: isAgreed, // 동의 여부를 전달
      });
      console.log('Response:', response.data); // 응답 처리
      // 필요에 따라 추가적인 로직을 작성할 수 있습니다.
    } catch (error) {
      console.error('Error submitting agreement:', error); // 오류 처리
    }
  };

  return (
    <div className="privacy_wrap">
      <div className="txtarea">
        <a className="focus_textarea" href="javascript:void(0)">
          개인정보의 수집목적 및 항목
        </a>
        <br />
        ① 수집 목적 : 원활한 고객 상담, 불편사항 및 문의사항 관련 의사소통 경로 확보
        <br />
        ② 수집 항목
        <br />
        *필수입력사항
        <br />
        - 이용자 식별을 위한 항목 : 성명, 연락처,
        <br />
        이메일, 아이디(로그인 시 수집)
        <br />
        <span className="color_red">
          <br />
          개인정보의 보유 및 이용기간
          <br />
          입력하신 개인정보는 소비자 보호에 관한 법률 등 관계 법률에 의해 다음과 같이 보유합니다.
          <br />
          보유기간 : 문의 접수 후 처리 완료 시점으로부터 3년
        </span>
        <br />
        <br />
        ※ 1:1문의 서비스 제공을 위한 최소한의 개인정보이며 거부할 수 있습니다. 다만, 수집에 동의하지 않을 경우 서비스 이용이 제한됩니다.
      </div>
     
     
    </div>
  );
};

export default PrivacyPolicy;
