import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/TimeTheaterType.css'

const TimeTheaterType = ({schedules}) => {
    
    const navigate = useNavigate();

    const [currentTime,setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => { //1분마다 콜백함수 실행
            setCurrentTime(new Date())
        },600000) //10분 마다 현재 시간 업데이트
        return () => clearInterval(timer) //메모리 누수를 방지
    },[])

    const theaterTypeData = useMemo(()=>{
        const data = {}
        schedules.forEach(schedule => {
            const {theater_type} = schedule
            if(!data[theater_type]){
                data[theater_type] = []
            }
            const scheduleTime =  new Date(schedule.start_time)
            if(scheduleTime > currentTime){
                data[theater_type].push(schedule)
            }
        })
        return data
    },[schedules,currentTime])

    const formatTime = (isoString) => {
        const date = new Date(isoString)
        return date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit',hour12: false})
    }

    // const handleButtonClick = (schedule) => {
    //     // 예매 페이지로 스케줄 정보 전달
    //     navigate('/reservation', { state: { schedule } });
    //   };
    
    
    return (
        <>
            {Object.entries(theaterTypeData).map(([theater_type,filteredschedules])=>(
                <div key={theater_type} className='time_scroll_select'>
                    <span>{theater_type}</span>
                    <div className='time_scroll_select_buttons'>
                        {filteredschedules.map(schedule => (
                            <button key={schedule.start_time}>
                                <span>{formatTime(schedule.start_time)}</span>
                                <span>{schedule.screen_no}관</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default TimeTheaterType;