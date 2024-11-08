import React, { useState } from 'react';
import icMyMenu1 from '../../image/ic_my_menu_1.png';
import icMyMenu4 from '../../image/ic_my_menu_4.png';
import icMyMenu5 from '../../image/ic_my_menu_5.png';
import '../../css/SH/MyInfo.css';
import InfoUpdate from './InfoUpdate';
import ProfileModal from './ProfileModal';
import GogakExit from './GogakExit';


const MyInfo = ({ userId }) => {

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [showInfoUpdate, setShowInfoUpdate] = useState(false); // 상태 추가
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);

    const handleOpenProfileModal = () => {
        setIsProfileModalOpen(true);
        setShowInfoUpdate(false); // 다른 모달이 열릴 때 InfoUpdate 숨김
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const handleInfoUpdateClick = () => {
        setShowInfoUpdate(true); // InfoUpdate 표시
    };

    const handleOpenExitModal = () => {
        setIsExitModalOpen(true);
        setShowInfoUpdate(false); // 다른 모달이 열릴 때 InfoUpdate 숨김
    };

    const handleCloseExitModal = () => {
        setIsExitModalOpen(false);
    };

    return (
        <div>
            <div className="mypage_wrap">
                <ul className="mypage_menu_box">
                    <li>
                        <a href="#none" onClick={handleInfoUpdateClick}>
                            <span className="img">
                                <img src={icMyMenu1} alt="회원 정보 변경" />
                            </span>
                            <span className="txt_rt_arrow">회원 정보 변경</span>
                        </a>
                    </li>
                    <li>
                        <a href="#none" onClick={handleOpenProfileModal}>
                            <span className="img">
                                <img src={icMyMenu4} alt="프로필 변경" />
                            </span>
                            <span className="txt_rt_arrow">프로필 변경</span>
                        </a>
                    </li>
                    <li>
                        <a href="#none" onClick={handleOpenExitModal}>
                            <span className="img">
                                <img src={icMyMenu5} alt="회원탈퇴" />
                            </span>
                            <span className="txt_rt_arrow">회원탈퇴</span>
                        </a>
                    </li>                  
                </ul>
            </div>
            {showInfoUpdate && <InfoUpdate onClose={() => setShowInfoUpdate(false)} userId={userId}/>}

            {/* 프로필 변경 모달 */}
            <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} userId={userId} />

            {/* 탈퇴 모달 */}
            {isExitModalOpen && <GogakExit onClose={handleCloseExitModal} userId={userId}/>}
        </div>
    );
};

export default MyInfo;