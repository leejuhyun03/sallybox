import React,{useState} from "react";
import "../../css/jy/Gogaksenter.css";
import "../../css/jy/Gogakregistration.css";
import "../../css/jy/tab.css";

import qowndyd from "../../image/temp_1728880786084.1233137906.jpeg";


import { Link } from 'react-router-dom';


import PostNumberWithPrivacyPolicy from "./PostNumberWithPrivacyPolicy";


const Gogakregistration = () => {

  const [isAgreed, setIsAgreed] = useState(false); // 동의 상태를 관리하는 상태

  const handleAgreementChange = (isAgreed) => {
    setIsAgreed(isAgreed); // 동의 여부 업데이트
  };

 




  return (
    <div>
     

      {/* 질문 등록 중단 */}
      <div
        id="contents"
        className="contents_customer area__movingbar litype5"
      >
        <div id="title_top">
          <h2 className="tit" style={{ fontSize: 25, margin: 0, padding: 0 }}>
            고객센터
          </h2>
        </div>

        {/* 리스트 */}
        <ul className="tab_wrap outer actionmovingbar">
          <li className="active">
            <div className="tab_con ty2">
              <button className="button1" style={{width: '980px'}}>1:1 문의</button>

              <div className="tab_con">
                <div className="con_top">
                  <div className="ico_tit qus">
                    "허강현 또는 이주현 한테 물어보시면 궁금증을 더 빠르게
                    해결하실 수 있습니다!"
                    <div className="mt10 mb10">
                      <button
                        type="button"
                        className="btn_col4 ty5 m10"
                      >
                        배주용
                      </button>
                      <button
                        type="button"
                        className="btn_col4 ty5 roboto"
                      >
                        <Link to="/sallybox/gogaksenter">
                        FAQ
                        </Link>
                      </button>
                    </div>
                    <div className="timedesc">
                      배주용 운영시간: 평일 09:00~18:20
                    </div>
                    <ul className="list_txt mt10">
                      <li>
                        1:1 나문의 답변 운영시간: 평일 09:00~18:20
                      </li>
                      <li>
                        주말/공휴일 미운영하며, 영업시간 내 순차적 답변
                        처리됩니다.
                      </li>
                    </ul>
                  </div>
                  <div className="btn_wrap"></div>
                </div>

                <dl className="contxt_type1">
                  <dt className="tit">
                    고객님의 문의에{" "}
                    <span className="txt_color02">
                      답변하는 직원은 고객 여러분의 가족 중 한 사람
                    </span>
                    일 수 있습니다
                  </dt>
                  <dd className="desc">
                    고객의 언어폭력(비하, 욕설, 반말, 성희롱 등)으로부터
                    직원을 보호하기 위해 관련 법에 따라 수사기관에 필요한
                    조치를 요구할 수 있으며, 형법에 의해 처벌 대상이 될 수
                    있습니다.
                  </dd>
                </dl>

                <div className="con_tit ty2">
                  <h4 className="tit">고객 정보</h4>
                  <div className="group_rgt">
                    <span className="txt_req">필수입력</span>
                  </div>
                </div>


                <PostNumberWithPrivacyPolicy/>{/* 문의내용집합 */}
                
               
                <div className="group_rgt">
                  <p className="txt_form">
                    문의를 통해 아래의 개인정보를 수집합니다. 수집된
                    개인정보는 문의 외 목적으로 사용하지 않습니다.
                  </p>
                </div>

                  

              </div>
              
            </div>
            
          </li>
          
        </ul>
        <div id="banner_section" className="banner_wrap">
                <div
                  className="banner_01"
                  style={{
                    backgroundImage: `url(${qowndyd})`,
                    width: "100%",
                    height: "300px",
                    backgroundSize:500,
                  }}
                ></div>
              </div>

        
     </div>

      
    </div>
  );
};

export default Gogakregistration;
