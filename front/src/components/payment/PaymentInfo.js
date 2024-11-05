import React from 'react';
import '../../css/payment/PayInfo.css'

const PaymentInfo = () => {
    return (
        <div className='article_wrap'>
            <div className='group_top'>
                <h4>결제하기</h4>
            </div>
            <div className='inner'>
                <div className='select_point'></div>
                <div className='payment_sum'></div>
            </div>
        </div>
    );
};

export default PaymentInfo;