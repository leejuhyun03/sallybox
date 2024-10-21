import React, { useEffect, useState } from 'react';

import '../css/Theater.css'
import '../css/Theater_bottom.css'
import Theater_bottom from './Theater_bottom';
import TheaterTop from './TheaterTop';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Theater = () => {

    const {cinema_id} = useParams();
    const [cinemaDTO,setCinemaDTO] = useState(null);
    const [scheduleMap,setScheduleMap] = useState(new Map());

    useEffect(()=>{

        if (cinema_id) {
            axios.get(`http://localhost:8085/sallybox/cinema/${cinema_id}`)
            .then(response=> { //response가 DTO 형태 (cinemaDTO,Map<Integer,List<ScheduleDTO>>)
                setCinemaDTO(response.data.cinemaDTO)
                
                //object형태로 넘어온 걸 map형태로 변환 (map이 Object(배열) 형태로 넘어옴)
                if (response.data.schedules) {
                    const scheduleMap = new Map(Object.entries(response.data.schedules));
                    setScheduleMap(scheduleMap);
                } else {
                    console.warn('schedules is undefined or null');
                    setScheduleMap(new Map()); // 빈 Map으로 설정하거나 다른 기본값 설정
                }
                
            })
            .catch(err=>{
                console.log('cinemaDTO 받는데 실패', err.response ? err.response.data : err)
            })
        }
    },[cinema_id])

    if(!cinemaDTO || !scheduleMap){
        <p>Loading....</p>
    }

    return (
        <div id='wrap'>   
            <div className='header'> 
                {/* navbar들어갈 자리           */}
            </div>
            <div className='contents'>
                
                <TheaterTop cinemaDTO={cinemaDTO}/>
                
                <Theater_bottom scheduleMap={scheduleMap}/>
                

            </div>


        </div>

        
    );
};

export default Theater;