<<<<<<< HEAD
import React, { useState } from 'react';
import '../../css/payment/PayInfo.css'
import axios from 'axios';

const PayMethod = () => {

    const [pointOpen,setPointOpen] = useState(false)
    const [userPoint,setUserPoint] = useState(null)

    const onClickPoint = async() => {
        setPointOpen(!pointOpen);

        if(!pointOpen){
            try{
                const response = await axios.get('/sallybox/payment');
                setUserPoint(response.data)
            }catch (error){
                alert('포인트 조회 중 에러:' + error)
            }
        }
    }

    return (
        <div className='article_wrap'>
            <div className='group_top'>
                <h4>결제 수단</h4>
            </div>
            <div className='inner'>
                <div className='group_discount'>
                    <h3>할인/포인트</h3>
                    <button>포인트 조회</button>
                    <div></div>
                </div>
                <div className='gourp_payment'></div>
            </div>
        </div>
    );
};

=======
import React, { useState } from 'react';
import '../../css/payment/PayInfo.css'
import axios from 'axios';

const PayMethod = () => {

    const [pointOpen,setPointOpen] = useState(false)
    const [userPoint,setUserPoint] = useState(null)

    const onClickPoint = async() => {
        setPointOpen(!pointOpen);

        if(!pointOpen){
            try{
                const response = await axios.get('/sallybox/payment');
                setUserPoint(response.data)
            }catch (error){
                alert('포인트 조회 중 에러:' + error)
            }
        }
    }

    return (
        <div className='article_wrap'>
            <div className='group_top'>
                <h4>결제 수단</h4>
            </div>
            <div className='inner'>
                <div className='group_discount'>
                    <h3>할인/포인트</h3>
                    <button>포인트 조회</button>
                    <div></div>
                </div>
                <div className='gourp_payment'></div>
            </div>
        </div>
    );
};

>>>>>>> 963c018b77b364d1a5310fbcfa99d105fdfe1969
export default PayMethod;