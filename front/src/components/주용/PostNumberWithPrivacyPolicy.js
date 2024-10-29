import React, { useState } from "react";
import axios from "axios";
import "./Gogakregistration.css";
import "./Gogaksenter.css";
import "./nav.css";
import "./tab.css";

const PostNumberWithPrivacyPolicy = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(['', '']);
  const [email, setEmail] = useState(['', '']);
  const [title, setTitle] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();

      // 필드 값이 비어있는 경우 경고
      if (!name || !phoneNumber[0] || !phoneNumber[1] || !email[0] || !email[1] || !title || !inputValue) {
          alert("모든 필드를 입력해주세요.");
          return;
      }

      const fullPhoneNumber = phoneNumber.join("");
      const fullEmail = email.join("@");

      try {
          const response = await axios.post("http://localhost:8085/api/inquiries", {
              name,
              phoneNumber: fullPhoneNumber,
              email: fullEmail,
              title,
              content: inputValue,
          });

          console.log("Response:", response.data);
          alert(response.data); // 응답 메시지 표시
      } catch (error) {
          console.error("Error submitting inquiry:", error);
          alert("문의 제출에 실패했습니다.");
      }
  };

  return (
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label>이름:</label>
              <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
              />
          </div>
          <div className="form-group">
              <label>전화번호:</label>
              <input
                  type="text"
                  placeholder="010"
                  value={phoneNumber[0]}
                  onChange={(e) => setPhoneNumber([e.target.value, phoneNumber[1]])}
                  required
              />
              <input
                  type="text"
                  placeholder="1234"
                  value={phoneNumber[1]}
                  onChange={(e) => setPhoneNumber([phoneNumber[0], e.target.value])}
                  required
              />
          </div>
          <div className="form-group">
              <label>이메일:</label>
              <input
                  type="text"
                  placeholder="example"
                  value={email[0]}
                  onChange={(e) => setEmail([e.target.value, email[1]])}
                  required
              />
              <input
                  type="text"
                  placeholder="domain.com"
                  value={email[1]}
                  onChange={(e) => setEmail([email[0], e.target.value])}
                  required
              />
          </div>
          <div className="form-group">
              <label>제목:</label>
              <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
              />
          </div>
          <div className="form-group">
              <label>내용:</label>
              <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
              />
          </div>
          <button type="submit">제출</button>
      </form>
  );
};

export default PostNumberWithPrivacyPolicy;
