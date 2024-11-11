import React, { useState } from "react"; // React와 useState 훅을 가져옵니다.
import axios from "axios"; // axios를 사용하여 API 요청을 보낼 것입니다.
import "./InfoUpdate.css"; // 스타일 파일을 가져옵니다.

const InfoUpdate = ({ onClose ,userId}) => {
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [phone, setPhone] = useState(""); // 전화번호 상태
  const [passwordMessage, setPasswordMessage] = useState("8-13자리의 영문/숫자를 함께 입력해주세요.");
  const validatePassword = (pwd) => {
    if (pwd === "") return true; // 비밀번호를 입력하지 않은 경우 유효
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,13}$/;
    return regex.test(pwd);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword && !validatePassword(newPassword)) {
      setPasswordMessage("비밀번호는 8-13자리의 영문자와 숫자를 혼용해야 합니다.");
    } else {
      setPasswordMessage("8-13자리의 영문/숫자를 함께 입력해주세요.");
    }
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password && !validatePassword(password)) {
      alert("비밀번호는 8-13자리의 영문자와 숫자를 혼용해야 합니다.");
      return;
    }

    try {
      const response = await axios.put('/sallybox/mypage/update', {
        userId, 
        nickname: nickname,
        password: password,
        phoneNumber: phone
      });
      
      console.log('서버 응답:', response.data);
      alert('회원 정보가 성공적으로 업데이트되었습니다.');
      onClose(); // 모달 창 닫기

    } catch (error) {
      console.error('에러 발생:', error);
      alert('회원 정보 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
    
  };

  return (
    <div>
      <div id="mast-body">
        <div className="container">
          <div className="toparea">
            <h2 className="title">회원정보변경</h2>
          </div>
          <div className="contents">
            <div className="section __half">
              <h3 className="subject __underline">
                <em>
                  회원정보 입력
                  <span className="__require-info __point-color">
                    <small>*는 필수입력 항목입니다.</small>
                  </span>
                </em>
              </h3>

              {/* 닉네임 입력 필드 */}
              <div className="row" id="div-cstNm">
                <div className="col-md">
                  <label>
                    <em className="__point-color">*</em>
                    닉네임
                  </label>
                </div>
                <div className="col-md">
                  <div className="form-wrap">
                    <div className="ui-input">
                      <input
                        type="text"
                        id="user-nickname"
                        maxLength="20"
                        title="닉네임을 입력해주세요"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임을 입력하세요"
                        className="gray-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 비밀번호 입력 필드 */}
              <div className="row" id="div-pswd-change">
            <div className="col-md">
              <label>비밀번호</label>
            </div>
            <div className="col-md">
              <div className="form-wrap __nomal">
                <div className="inner">
                  <div className="ui-input">
                    <input
                      type="password"
                      id="user-pwd"
                      maxLength="20"
                      title="비밀번호를 입력해주세요"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="비밀번호를 입력하세요"
                      className="gray-input"
                    />
                  </div>
                </div>
                <span className={`__point-color ${password && !validatePassword(password) ? "__error" : ""}`}>
                  <small>{passwordMessage}</small>
                </span>
                <div className="inner">
                  <div className="ui-input">
                    <input
                      type="password"
                      id="user-pwd-check"
                      maxLength="20"
                      title="입력하신 비밀번호를 다시 한번 입력해주세요"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="입력하신 비밀번호를 다시 입력하세요"
                      className="gray-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

              {/* 휴대폰 번호 입력 필드 */}
              <div className="row" id="div-mblNo">
                <div className="col-md">
                  <label>
                    <em className="__point-color">*</em>휴대폰 번호
                  </label>
                </div>
                <div className="col-md">
                  <div className="form-wrap">
                    <div className="ui-input">
                      <input
                        type="text"
                        id="user-phone"
                        maxLength="11"
                        title="휴대폰 번호를 입력해주세요"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="휴대폰 번호를 입력하세요"
                        className="gray-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-area __center">
              <button type="button" className="ui-button __square-large __black" onClick={onClose}>취소</button>
              <button type="button" className="ui-button __square-large __point-color" onClick={handleSubmit}>확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUpdate;
