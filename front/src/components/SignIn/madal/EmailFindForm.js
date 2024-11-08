import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/SignIn/modal/modal.css';

function EmailFindForm({ isOpen, onClose, onFindEmail }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [maskedEmail, setMaskedEmail] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');

      axios.post('/api/findEmail', { name,  phoneNumber})
      .then(response => {
        if (response.data) {
            setMaskedEmail(response.data); // 가공된 이메일 저장
            onFindEmail(response.data); // 이메일 찾기 성공 시 결과 모달 열기
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
            setError(error.response.data);
        } else {
            setError('이메일 찾기 중 오류가 발생했습니다.');
        }
        console.error('FindEmail error:', error);
      });
    };

    const onESC = (event) => {
      if (event.key !== 'Escape') return;
      onClose();
    };

    useEffect(() => {
      window.addEventListener('keydown', onESC);
  
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        window.removeEventListener('keydown', onESC);
      };
    }, []);

    if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose} onKeyDown={(event) => onESC(event)}>✖</button> 
          <h3>이메일 찾기</h3>
          <form onSubmit={handleSubmit}>
            <h4>이름: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></h4>
            <h4>휴대폰 번호: <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></h4>
            <button type='submit'>이메일 찾기</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    );
}

export default EmailFindForm;
