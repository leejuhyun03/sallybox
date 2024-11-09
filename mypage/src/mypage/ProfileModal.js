import React, { useState } from 'react';
import './ProfileModal.css';
import closeIcon from '../assets/close_19.png';
import axios from 'axios';

const ProfileModal = ({ isOpen, onClose,userId }) => {

    const [nickname, setNickname] = useState(''); // 닉네임 상태 관리
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null; // 모달이 열려 있지 않으면 null 반환

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        if (value.length <= 10) { // 10자 이하일 경우에만 상태 업데이트
            setNickname(value);
        }
    };

    const updateNickname = async (userId, nickname) => {
        try {
            setIsLoading(true);
            console.log(userId);
            console.log(nickname);
            const response = await axios.put('/sallybox/mypage/editprofile', {
                userId,
                nickname
            });
            
            if (response.data.success) {
                alert('닉네임이 성공적으로 변경되었습니다.');
                onClose();
                window.location.reload(); // 페이지 새로고침
            } else {
                alert(response.data.message || '닉네임 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.message || '닉네임 변경 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };
    
      const handleSubmit = () => {
        if (nickname.trim() === '') {
          alert('닉네임을 입력해주세요.');
          return;
        }
        updateNickname(userId, nickname);
      };
    

    return (
        <div className="modal-overlay" onClick={onClose}> {/* 오버레이 클릭 시 모달 닫기 */}
            <div 
                id="layerEditProfile" 
                className="layer_wrap layer_mypage layer_edit_profile active" 
                style={{ left: '50%', top: '50%', transform: 'translate(-10%, 0%)' }}
                onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 방지
            >
                <div>
                    <strong className="hidden">레이어 팝업 시작</strong>
                    <div className="layer_header">
                        <h4 className="tit">프로필 편집</h4>
                        <button 
                            type="button" 
                            className="btn_close btnCloseLayer" 
                            onClick={onClose} // 닫기 버튼 클릭 시 모달 닫기
                        >
                            <img src={closeIcon} alt="닫기" className="close-icon" /> {/* 닫기 아이콘 이미지 */}
                        </button>
                    </div>
                    <div className="layer_contents">
                        <div className="reg_nick">
                            <label>
                                <span className="tit">닉네임변경</span>
                                <input 
                                    type="text" 
                                    placeholder="닉네임을 입력해 주세요" 
                                    name="memberNickName" 
                                    id="memberNickName" 
                                    value={nickname} // 상태값으로 입력값 설정
                                    onChange={handleNicknameChange} // 변경 시 핸들러 호출
                                />
                            </label>
                            <span className="cnt">
                                <span id="wordLen">{nickname.length}</span>/10
                            </span>
                        </div>
                        <div className="btn_btm_wrap ty1">
                            <button 
                                type="button" 
                                className="btn_col2 ty6" 
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                               {isLoading ? '처리 중...' : '완료'}
                            </button>
                        </div>
                    </div>
                    <strong className="hidden txtTabIndex" tabIndex="0">레이어 팝업 끝</strong>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;