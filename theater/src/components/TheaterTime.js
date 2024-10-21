import React from 'react';
import '../css/TheaterTime.css'
import all from '../image/grade_all.png'
import tweleve from '../image/grade_12.png'
import fifteen from '../image/grade_15.png'
import nineteen from '../image/pc_grade_19.png'
import arrow from '../image/arrow.png'
import TimeTheaterType from './TimeTheaterType';

const getAgeRatingImg = (age_rating) => {
    switch(age_rating){
        // case '전체연령가' : return '../image/grade_all.png'
        case '12세' : return tweleve;
        case '15세' : return fifteen;
        case '19세' : return nineteen ;
        default : return all;
    }
};


const TheaterTime = ({scheduleMap}) => {   

    //  console.log(scheduleMap)

    const groupedData = {}

    scheduleMap.forEach((schedules)=>{
        schedules.forEach(schedule=>{
            const {movie_id} = schedule
            if (!groupedData[movie_id]) { //groupedData에 movie_id에 대한 키가 존재하지 않으면 빈 객체 생성
                groupedData[movie_id] = [];
            }
            groupedData[movie_id].push(schedule); 
        })
    })
    console.log(groupedData)

    

    return (
        <div >
            {Object.entries(groupedData).map(([movie_id,schedules]) => (
                <div key={movie_id} className='time_scroll_select_wrap'>
                    <div className='time_scroll_title'>
                        <img src={getAgeRatingImg(schedules[0].age_rating)} alt='연령 사진' style={{width:'30px'}}/>
                        <span>{schedules[0].movie_title}</span>
                        <a href=''><img src={arrow} alt='영화 정보페이지 링크' style={{width:'10px'}}/></a>
                    </div>
                    <div>
                        <TimeTheaterType schedules={schedules}/>
                    </div>
                </div>
            ))}                     
        </div>        
    );
};

export default TheaterTime;