import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link  } from 'react-router-dom';
import InputBox from '../InputBox';

const ResetPassword = () => {

    const newPasswordRef = useRef(null);
    const confirmPasswordphoneNumberRef = useRef(null);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const email = location.state;

    const navigate = useNavigate();

    const onNewPasswordKeyDownHandler = (event) => {
        if (event.key !== 'Enter') return;
        if (!newPassword.current) return;
        newPassword.current.focus();
    };

    const onConfirmPasswordKeyDownHandler = (event) => {
        if (event.key !== 'Enter') return;
        onNewPasswordButtonClickHandler();
    };

    const onNewPasswordButtonClickHandler = (e) => {
        if (!newPassword || !confirmPassword) {
            alert('이름과 휴대폰 번호를 모두 입력하세요');
            return;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 비밀번호 유효성 검사
        if (newPassword !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('/api/resetPassword', null, {
                params: { 
                    password: newPassword,
                    email: email
                }
            });

            if (response.data) {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                navigate('/sallybox/sign-in')
            } else {
                setError('비밀번호 변경에 실패했습니다.');
            }
        } catch (err) {
            setError('서버 오류가 발생했습니다.');
            console.error(err);
        }
    };

    return (
        <div className='sign-in-wrapper'>
            <div className='sign-in-container'></div>
            <div className='sign-in-box'></div>
            <div className='sign-in-title' style={{marginLeft: '-5px'}}>
                <Link to={'/'}><div className='SALLYBOX-logo-button'>Sallybox</div></Link>
            </div>
            <div className='sign-in-content-box'>
                <div style={{fontSize: '25px', opacity: '0.65', marginBottom: '10px'}}><strong>새 비밀번호 설정</strong></div>
                {email} : {newPassword} : {confirmPassword}
                <div className='sign-in-content-input-box'>
                    <InputBox
                        ref={newPasswordRef}
                        title='새 비밀번호'
                        placeholder='새 비밀번호를 입력해주세요.'
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onKeyDown={onNewPasswordKeyDownHandler}
                    />
                    <InputBox
                        ref={confirmPasswordphoneNumberRef}
                        title='새 비밀번호 확인'
                        placeholder="동일하게 입력해 주세요."
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={onConfirmPasswordKeyDownHandler}
                    />
                </div>
                {error && <div><p style={{ color: 'red' }}>{error}</p></div>}
                <div className='sign-in-cotent-button-box'>
                <div className='primary-button-lg full-width' onClick={handleSubmit}>{'비밀번호 변경'}</div>
                <div className='text-link-container'>
                </div>
                <div className='sign-in-content-sns-sign-in-box'></div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
