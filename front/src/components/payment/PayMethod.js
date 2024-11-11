import React, { useState } from 'react';
import '../../css/payment/PayInfo.css'
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const PayMethod = ({setUsePoint}) => {

    const [pointOpen,setPointOpen] = useState(false)
    const [userPoint,setUserPoint] = useState(0)
    const [inputPoint,setInputPoint] = useState('');
    const { userId } = useUser();

    const fetchId = async() => {
        try {
            const response = await axios.post('http://192.168.16.4:8085/sallybox/payment', {
                user_id: userId
            });
            setUserPoint(response.data)
        } catch (error) {
            alert('포인트 조회 중 오류 발생:', error);
        }
    }

    const onClickPoint = () => {
        fetchId();
        setPointOpen(!pointOpen);
    }

    const onMaxPoint = () => {
        if(userPoint!==null){
            const maxPoint = Math.floor(userPoint/100)*100
            setInputPoint(maxPoint)
        }
    }

    const handleInputChange = (e) => {
        setInputPoint(e.target.value); // 입력된 값을 상태로 업데이트
    };

    const cancelPoint = () => {
        setInputPoint(0)
        setUsePoint(0)
    }

    const forUsePoint = () => {

        const pointToUse = parseInt(inputPoint,10)

        if(pointToUse > userPoint){
            alert('보유한 포인트보다 많습니다.')
            return
        }
        if(pointToUse<=0 || pointToUse % 100 !== 0){
            alert('포인트는 100P 단위로 사용 가능합니다.')
            return
        }
        
        setUsePoint(inputPoint)
    }

    return (
        <div className='article_wrap'>
            <div className='jh_group_top'>
                <h4>결제 수단</h4>
            </div>
            <div className='inner'>
                <div className='group_discount'>
                    <h4>할인/포인트</h4>
                    <button onClick={onClickPoint}>포인트 조회</button>
                    {
                        pointOpen && (
                            <div className='jh_Point_info'>
                                <div className='jh_Point_info_alert'>
                                    사용 가능한 포인트 : {userPoint}
                                </div>
                                <div className='jh_Point_info_Point'>
                                    <input type='text' placeholder='(100P 단위로 사용 가능)' value={inputPoint} onChange={handleInputChange}></input>
                                    <button onClick={onMaxPoint}>최대 적용</button>
                                </div>
                                <div className='jh_Point_use'>
                                    <button onClick={cancelPoint}>취소</button>
                                    <button onClick={forUsePoint}>적용</button>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='gourp_payment'>
                    <h4>최종 결제 수단</h4>
                </div>
            </div>
        </div>
    );
};

export default PayMethod;