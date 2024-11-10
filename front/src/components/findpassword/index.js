import React, { useEffect, useRef, useState } from 'react';
import InputBox from '../InputBox';
import "../../css/SignIn/style.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function FindPassword() {

    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const phoneNumberRef = useRef(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [toggle, setToggle] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [code, setCode] = useState('');

    const navigate = useNavigate();

    const onEmailKeyDownHandler = (event) => {
        if (event.key !== 'Enter') return;
        if (!nameRef.current) return;
        nameRef.current.focus();
    };

    const onNameKeyDownHandler = (event) => {
        if (event.key !== 'Enter') return;
        if (!phoneNumberRef.current) return;
        phoneNumberRef.current.focus();
    };

    const onPasswordKeyDownHandler = (event) => {
        if (event.key !== 'Enter') return;
        onSignInButtonClickHandler();
    };

    const onSignInButtonClickHandler = (e) => {
        if (!name || !phoneNumber) {
            alert('이름과 휴대폰 번호를 모두 입력하세요');
            return;
        }
    }

    const requestVerificationCode = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!name || !phoneNumber) {
            alert('이름과 휴대폰 번호를 모두 입력하세요');
            return;
        }

        try {
            const response = await axios.post(`/api/send-sms`, {
                phoneNumber: phoneNumber,
                email: email,
                name: name
            });

            if (response.data.message) {
                setSuccessMessage(response.data.message);
                setCode(response.data.code)
            } else {
                setError('인증번호 전송에 실패했습니다.');
            }
        } catch (err) {
            setError('입력하신 정보가 일치하지 않습니다.');
            console.error(err);
        }
    };

    // successMessage가 변경될 때 toggle 상태 업데이트
    useEffect(() => {
        if (successMessage === "인증번호가 발송되었습니다.") {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }, [successMessage]);

    const checkVerificationCode  = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/api/verificationCode', {
                verificationCode: verificationCode,
                code: code
            });

            if (response.data) {
                alert('인증이 완료 되었습니다.');
                navigate('/sallybox/resetPassword', {state: email});
            } else if (error.response && error.response.data) {
                setError2(error.response.data);
            }
        } catch (err) {
            setError2('인증번호가 일치하지 않습니다.');
            console.error(err);
        }
    };

    return (
        <div className='sign-in-wrapper'>
            <div className='sign-in-container'></div>
            <div className='sign-in-box'></div>
            <div className='sign-in-title'>
                <div className='SALLYBOX-logo-button'></div>
            </div>
            <div className='sign-in-content-box'>
                <div className='sign-in-content-input-box'>
                    <InputBox
                        ref={emailRef}
                        title='이메일'
                        placeholder='이메일을 입력해주세요.'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={onEmailKeyDownHandler}
                    />
                    <InputBox
                        ref={nameRef}
                        title='이름'
                        placeholder='이름을 입력해주세요.'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={onNameKeyDownHandler}
                    />
                     <InputBox
                        ref={phoneNumberRef}
                        title='휴대폰 번호'
                        placeholder="휴대폰 번호를 입력해주세요.('-'제외)"
                        type='text'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onKeyDown={onPasswordKeyDownHandler}
                    />
                    
                </div>
                {error && <div><p style={{ color: 'red' }}>{error}</p></div>}
                {
                    toggle && (
                    <>
                        <InputBox
                        ref={phoneNumberRef}
                        title='인증번호'
                        placeholder="인증번호(6자리 숫자)를 입력해 주세요."
                        type='text'
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        onKeyDown={onPasswordKeyDownHandler}
                    />
                    
                        {error2 && <p style={{ color: 'red' }}>{error2}</p>}
                    </>
                    )
                }
                <div className='sign-in-cotent-button-box'>
                    {
                        toggle ? (<div className='primary-button-lg full-width' onClick={requestVerificationCode}>{'다시 받기'}</div>) 
                        : (<div className='primary-button-lg full-width' onClick={requestVerificationCode}>{'인증번호 받기'}</div>)
                    }
                <div className='primary-button-lg full-width' onClick={checkVerificationCode}>{'확인'}</div>
                <div className='text-link-container'>
                </div>
                <div className='sign-in-content-sns-sign-in-box'></div>
                </div>
            </div>
        </div>
    );
}
