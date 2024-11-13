import React, { useRef, useState } from 'react';
import InputBox from '../InputBox';
import { SNS_SIGN_IN_URL } from '../../apis';
import { useCookies } from 'react-cookie';
import '../../css/SignIn/style.css';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom'; //useLocation지영
import EmailFindForm from './madal/EmailFindForm';
import EmailFindResult from './madal/EmailFindResult';
import EmailFindAllForm from './madal/EmailFindAllForm';
import { useUser } from '../../context/UserContext';

export default function SignIn() {
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();//지영
    const [error, setError] = useState('');
    const [isEmailFindModalOpen, setIsEmailFindModalOpen] = useState(false);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [isEmailAllFindModalOpen, setIsEmailAllFindModalOpen] = useState(false);
    const [maskedEmail, setMaskedEmail] = useState(''); // 가공된 이메일 상태 추가
    const [allEmail, setAllEmail] = useState(''); // 가공된 이메일 상태 추가

    const { setIsAuthenticated, userStatus } = useUser();


    const onEmailChangeHandler = (event) => {
        const { value } = event.target;
        setEmail(value.trim());
    };

    const onPasswordChangeHandler = (event) => {
        const { value } = event.target;
        setPassword(value.trim());
    };

    const onSignUpButtonClickHandler = () => {
        navigate('/sallybox/sign-up');
    };    

    const onSignInButtonClickHandler = (e) => {
        if (!email || !password) {
            alert('이메일과 비밀번호 모두 입력하세요');
            return;
        }

        e.preventDefault();
        setError('');

        // 로그인 요청
        axios.post('/api/login', { email, password }) // 요청 본문에 이메일과 비밀번호 전달
          .then(response => {
            if (response.data) {
              // 로그인 성공, JWT를 로컬 스토리지에 저장
              localStorage.setItem('token', response.data); // 토큰 저장
              setIsAuthenticated(true);
              // 메인 페이지로 이동

              //지영 이전페이지 경로가 없다면 기본 경로로 이동
              const redirectTo = location.state?.from || '/';
              navigate(redirectTo);
              // 페이지 전체를 새로고침
              window.location.reload();

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

    const onSnsSignInButtonClickHandler = (type) => {
        window.location.href = SNS_SIGN_IN_URL(type);
    };

    const onEmailKeyDownHandler = (event) => {
        if (event.key !== 'Enter') return;
        if (!passwordRef.current) return;
        passwordRef.current.focus();
    };

    const onPasswordKeyDownHandler = (event) => {
        if (event.key !== 'Enter') return;
        onSignInButtonClickHandler(event);
    };    
  
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

    return (
        <div className='sign-in-wrapper'>
            <div className='sign-in-container'></div>
            <div className='sign-in-box'></div>
            <div className='sign-in-title'>
                <Link to={'/'}><div className='SALLYBOX-logo-button'></div></Link>
            </div>
            <div className='sign-in-content-box'>
                <div className='sign-in-content-input-box'>
                    <InputBox
                        ref={emailRef}
                        title='아이디(이메일)'
                        placeholder='이메일 주소를 입력해주세요.'
                        type='text'
                        value={email}
                        onChange={onEmailChangeHandler}
                        onKeyDown={onEmailKeyDownHandler}
                    />
                    <InputBox
                        ref={passwordRef}
                        title='비밀번호'
                        placeholder='비밀번호를 입력해주세요.'
                        type='password'
                        value={password}
                        onChange={onPasswordChangeHandler}
                        onKeyDown={onPasswordKeyDownHandler}
                    />
                </div>
                {error && <div><p style={{ color: 'red' }}>{error}</p></div>}
                <div className='sign-in-cotent-button-box'>
                <div className='primary-button-lg full-width' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                <div className='text-link-container'>
                <div className='text-link-lg full-width' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div><div className='text-link-lg2'></div>
                <div className='text-link-lg full-width' onClick={() => setIsEmailFindModalOpen(true)}> {'아이디 찾기'}</div><div className='text-link-lg2'></div>
                <div className='text-link-lg full-width'><Link to={'/sallybox/verification'} style={{textDecoration: 'none', color: 'rgba(113, 113, 113, 1)'}}>{'비밀번호 찾기'}</Link></div>
                </div>
                
                <div className='sign-in-content-divider'></div>
                <div className='sign-in-content-sns-sign-in-box'></div>
                <div className='sign-in-content-sns-sign-in-title'>{'SNS 로그인'}</div>
                <div className='sign-in-content-sns-sign-in-button-box'>
                    <div className='kakao-sign-in-button' onClick={() => onSnsSignInButtonClickHandler('kakao')}></div>
                    <div className='naver-sign-in-button' onClick={() => onSnsSignInButtonClickHandler('naver')}></div>
                </div>
                </div>
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
        </div>
    );
}
