import React, { useState } from 'react';
import '../../../css/SignIn/modal/modal.css';
import { Link } from 'react-router-dom';

function EmailFindResult({ isOpen, onClose, maskedEmail, FindAllEmailOpen, allEmail }) {
    const [isAllFindModalOpen, setIsAllFindModalOpen] = useState(false);

    if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

    const handleRefresh = () => {
        window.location.reload(); // 페이지 새로고침
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>이메일 찾기 결과</h2>
                {maskedEmail ? (
                    <p>찾은 이메일: {maskedEmail}</p>
                ) : (
                    <p>이메일을 찾을 수 없습니다.</p>
                )}
                {maskedEmail === allEmail ? (
                    <button className='link' onClick={handleRefresh}>로그인</button>
                ) : (
                    <button onClick={FindAllEmailOpen}>이메일 전체 찾기</button>
                )}
            </div>
        </div>
    );
}

export default EmailFindResult;
