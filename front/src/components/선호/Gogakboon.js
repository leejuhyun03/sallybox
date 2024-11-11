import React from 'react';
import '../../css/SH/Gogakboon.css';

const Gogakboon = () => {
    return (
        <div>
            <div className="rank_2020_wrap">
                <h3 className="tit">
                    <em>VIP</em>
                    선정 및 유지 기준
                </h3>
                <div className="rank_2020_list_ty2">
                  
                    <dl>
                        <dt className="ic_2020_vip">
                            <span className="txt_2020_rank1">VIP</span>
                        </dt>
                        <dd>SallyBox가입 고객님</dd>
                    </dl>
                    <dl>
                        <dt className="ic_2020_vvip">
                            <span className="txt_2020_rank2">VVIP</span>
                        </dt>
                        <dd>
                            <em>1000</em> 포인트 이상
                        </dd>
                    </dl>
                    <dl>
                        <dt className="ic_2020_gold">
                            <span className="txt_2020_rank3">GOLD</span>
                        </dt>
                        <dd>
                            <em>5000</em> 포인트 이상
                        </dd>
                    </dl>
                    <dl>
                        <dt className="ic_2020_platinum">
                            <span className="txt_2020_rank4">PLATINUM</span>
                        </dt>
                        <dd>
                            <em>10000</em> 포인트 이상
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Gogakboon;
