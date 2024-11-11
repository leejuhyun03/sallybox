import React from 'react';
import '../../css/SH/GogakExit.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GogakExit = ({ onClose, userId }) => {

    const navigate = useNavigate();
    

    const handleWithdrawal = async () => {
        try {
            const data = { userId: Number(userId), status: 'N' };
            console.log('Sending data:', data);
            // 백엔드 API 호출하여 사용자 상태 변경
            const response = await axios.put('/sallybox/mypage/deactivate', data);

            if (response.data.success) {
                // 로그아웃 처리
                await axios.post('/sallybox/auth/logout');
                
                // 로컬 스토리지의 사용자 정보 삭제
                localStorage.removeItem('token');
                
                // 홈페이지로 리다이렉트
                navigate('/');
                
                alert("탈퇴 처리되었습니다.");
            }
        } catch (error) {
            console.error("탈퇴 처리 중 오류가 발생했습니다:", error);
            alert("탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="gogak-exit-modal-overlay">
            <div className="gogak-exit-modal">
                <div className="row">
                    <div className="warning__dark-gray">
                        <p> 아이디를 탈퇴하시면 서비스 부정 이용 방지를 위하여 제휴사 회원정책에 따라 일정 기간 동안 회원 재 가입이 불가합니다.</p>
                        <p> 제휴사 탈퇴 시, 제휴사에서 사용하시던 <span style={{ fontWeight: 600 }}><u>포인트</u></span> 는 복원할 수 없습니다.</p>
                        <p> 제휴사에서 진행중인 주문 또는 이용중인 서비스가 있을 경우 탈퇴가 불가합니다.</p>
                        <p>탈퇴 즉시 개인정보가 삭제되면, 어떠한 방법으로도 복원할 수 없습니다. (전자상거래 서비스 등의 거래내역은 전자상거래 등에서의 소비자보호에 관한 법률에 의거하여 보호됩니다.)</p>
                    </div>
                </div>
                <p>탈퇴를 진행하시겠습니까?</p>
                <div className="button-group">
                    <button className="confirm-button" onClick={handleWithdrawal}>탈퇴 진행</button>
                    <button className="cancel-button" onClick={onClose}>탈퇴 취소</button>
                </div>
            </div>
        </div>
    );
};

export default GogakExit;
