import React, { useState, useEffect } from "react";
import "../../css/jy/Gogaksenter.css";
import "../../css/jy/nav.css";
import "../../css/jy/tab.css";

import qowndyd from "../../image/temp_1728880786084.1233137906.jpeg";

import { Link } from "react-router-dom";
import LookGogak from "./LookGogak";




const Gogaksenter = () => {


  return (
    <div>
      {/* body */}
     

      {/* 고객센터 중단 */}
      <div id="contents">
        <div id="title_top">
          <h2 className="tit" style={{ fontSize: 25, margin: 0, padding: 0 }}>
            고객센터
          </h2>
        </div>
        {/* 리스트 */}
        <ul className="tab_wrap outer actionmovingbar">
          <li className="active">
            <div className="tab_con ty2">
              <button className="button1"><Link to="/sallybox/gogaksenter" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> FAQ</Link></button>

                  <LookGogak/>
                        {/* 항목들 */}

              <div className="txt_help_wrap">
              <Link to="/sallybox/registration" style={{ fontSize: 15, fontWeight: "bold" }}
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>1:1문의 바로가기</Link>
              </div>
        
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
          </li>
        </ul>
      </div>{" "}
      {/* 고객센터 중단끝 */}
      {/* body */}{" "}
    </div>
  );
};

export default Gogaksenter;
