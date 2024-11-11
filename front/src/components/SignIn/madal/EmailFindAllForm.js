import React, { useState } from 'react';
import axios from 'axios';
import '../../../css/SignIn/modal/modal.css';

function EmailFindAllForm({ isOpen, onClose, onFindEmail }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [genderCode, setGenderCode] = useState('');
    const [error, setError] = useState('');
    const [resultEmail, setResultEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        axios.post('/api/allfindEmail', { name, phoneNumber })
        .then(response => {
            if (response.data) {
                setResultEmail(response.data); // 결과 이메일 설정
                onFindEmail(response.data); // 이메일 찾기 성공 시 결과 모달 열기
            }
        })
        .catch(error => {
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('이메일 찾기 중 오류가 발생했습니다.');
            }
            console.error('FindAllEmail error:', error);
        });
    };

    if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

    return (
        <div className="modal-overlay">
            <div className="modal-contents">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>이메일 전체 찾기</h2>
                <form onSubmit={handleSubmit}>
                    <h4>이름: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></h4>
                    <h4>휴대폰 번호: <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></h4>
                    <h4>생년월일: <input type="text" value={birthday} onChange={(e) => setBirthday(e.target.value)} /></h4>
                    <button className='buttond' type='submit'>이메일 찾기</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default EmailFindAllForm;
