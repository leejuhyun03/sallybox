import React from 'react';
import '../../css/payment/PayInfo.css'

const PayMethod = () => {
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

export default PayMethod;