import React from 'react';
import './footer.css'
import sallylogo from './logo_gray.png'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div id='footer_section' className='footer'>
                <div className="inner">
                    <span className="f_logo">
                        <Link to={'/'}><img src={sallylogo} alt="LOTTE CINEMA"/></Link>
                    </span>
                    <ul className="f_menu type1" style={{padding: '0'}}>
                        <li><a style={{textDecoration: '#none'}} href="#none" title="회사소개" target="_self">회사소개</a></li>
                        <li><a href="#none" title="이용약관" target="_self">이용약관</a></li>
                        <li><a href="#none" title="개인정보처리방침" target="_self"><strong>개인정보처리방침</strong></a></li>
                        <li><a href="#none" title="이메일무단수집거부" target="_self">이메일무단수집거부</a></li>
                        <li><a href="#none" title="고정형 영상정보처리기기 운영 및 관리방침" target="_self">고정형 영상정보처리기기 운영 및 관리방침</a></li>
                        <li><a href="#none" title="L.POINT회원안내" target="_self">L.POINT회원안내</a></li>
                        <li><a href="#none" title="배정기준" target="_self">배정기준</a></li>
                        <li><a href="#none" title="채용안내" target="_blank">채용안내</a></li>
                        <li><a href="#none" title="광고/임대문의" target="_blank">광고/임대문의</a></li>
                        <li><a href="#none" title="사회적책임" target="_self">사회적책임</a></li>
                    </ul>
                    <div className="bx_address type1">
                        <address>경기도 남양주시 와부읍 덕소로97 69  샐리빌딩</address>
                        <br/>
                        <span>대표 이메일 <em className="roboto pl5">yoonsunho123@gmail.com</em></span>
                        <span className="bar">고객센터 <em className="roboto">1544-1234</em> (유료)</span>
                        <span className="bar">사업자등록번호 <em className="roboto">313-12-12345</em></span>
                        <br/>
                        <span>대표이사 샐리윤</span>
                        <span className="bar">개인정보 보호 책임자 이주현</span>
                    </div>
                    <p className="copyright">Copyright © SALLY Cultureworks All Right Reserved.</p>
                </div>
            </div>   
        </>
    );
};

export default Footer;