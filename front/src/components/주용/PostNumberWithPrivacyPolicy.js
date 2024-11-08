import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 추가
import "../../css/jy/Gogakregistration.css";
import "../../css/jy/Gogaksenter.css";
import "../../css/jy/nav.css";
import "../../css/jy/tab.css";

const PostNumberWithPrivacyPolicy = () => {
  const [name, setName] = useState('');
  const [phone_Number, setPhone_Number] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // 추가

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필드 값이 비어있는 경우 경고
    if (!name || !phone_Number || !email || !title || !content) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/inquiries", {
        name: name,
        phone_Number: phone_Number,
        email: email,
        title: title,
        content: content,
      });

      console.log("Response:", response.data);
      alert("문의 제출이 완료되었습니다."); // 응답 메시지 표시
      
      // 고객센터 페이지로 리디렉션
      navigate("/sallybox/gogaksenter"); // 추가

    } catch (error) {
      console.error("Error response inquiry:", error.response.data);
      alert("문의 제출에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bx_textarea">
        <label>이름: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>전화번호: </label>
        <input
          type="text"
          placeholder="01012345678"
          value={phone_Number}
          onChange={(e) => setPhone_Number(e.target.value)} // 전체 전화번호를 직접 입력
          required
        />
      </div>
      <div className="form-group">
        <label>이메일: </label>
        <input
          type="text"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 전체 이메일을 직접 입력
          required
        />
        <div className="con_tit ty2">
          <h4 className="tit">문의 내용</h4>
        </div>
      </div>
      <div className="form-group">
        <label>제목: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>내용: </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">제출</button>
    </form>
  );
};

export default PostNumberWithPrivacyPolicy;
