import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import EmailFindForm from './EmailFindForm';
import EmailFindResult from './EmailFindResult';
import EmailFindAllForm from './EmailFindAllForm';

function LoginTest() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [isEmailFindModalOpen, setIsEmailFindModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isEmailAllFindModalOpen, setIsEmailAllFindModalOpen] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState(''); // 가공된 이메일 상태 추가
  const [allEmail, setAllEmail] = useState(''); // 가공된 이메일 상태 추가
  
  const navigate = useNavigate();

  const handleFindEmail = (email) => {
    setMaskedEmail(email); // 가공된 이메일 상태 설정
    setIsEmailFindModalOpen(false); // 이메일 찾기 모달 닫기
    setIsResultModalOpen(true); // 결과 모달 열기
  };

  const FindAllEmailOpen = () => {
    setIsEmailAllFindModalOpen(true);
    setIsResultModalOpen(false); // 결과 모달 열기
  }

  const handleFindAllEmail = (email) => {
    setMaskedEmail(email); // 가공된 이메일 상태 설정
    setAllEmail(email);
    setIsEmailAllFindModalOpen(false); // 이메일 찾기 모달 닫기
    setIsResultModalOpen(true); // 결과 모달 열기
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 로그인 요청
    axios.post('/api/login', { email, pwd }) // 요청 본문에 이메일과 비밀번호 전달
      .then(response => {
        if (response.data) {
          // 로그인 성공, JWT를 로컬 스토리지에 저장
          localStorage.setItem('token', response.data); // 토큰 저장

          console.log('Response Data:', response.data); // 로그 추가
          
          // 메인 페이지로 이동
          navigate('/');
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          // 서버에서 반환된 메시지를 가져오기
          const errorMessage = error.response.data;
          setError(errorMessage); // 문자열 메시지를 설정
        } else {
          setError('로그인 중 오류가 발생했습니다.');
        }
        console.error('Login error:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br/>
          <label htmlFor="pwd">비밀번호: </label>
          <input
            type="password" // 비밀번호 입력 필드로 수정
            id="pwd"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => setIsEmailFindModalOpen(true)}>이메일 찾기</button>
      <button><Link to={'/sendSms'} style={{textDecoration: 'none', color: 'black'}}>비밀번호 찾기</Link></button>
        <EmailFindForm 
            isOpen={isEmailFindModalOpen} 
            onClose={() => setIsEmailFindModalOpen(false)} 
            onFindEmail={handleFindEmail} 
        />
        <EmailFindResult 
            isOpen={isResultModalOpen} 
            onClose={() => setIsResultModalOpen(false)} 
            FindAllEmailOpen = {FindAllEmailOpen}
            maskedEmail={maskedEmail} // 가공된 이메일 전달
            allEmail = {allEmail}
        />
        <EmailFindAllForm
            isOpen={isEmailAllFindModalOpen} 
            onClose={() => setIsEmailAllFindModalOpen(false)} 
            onFindEmail={handleFindAllEmail} // 가공된 이메일 전달
        />
    </div>
  );
}

export default LoginTest;
