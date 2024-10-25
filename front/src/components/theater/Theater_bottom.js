import React, { useState } from 'react';
import '../../css/theater/Theater_bottom.css'
import allGrade from '../../image/grade_all.png'
import twoGrade from '../../image/grade_12.png'
import fiveGrade from '../../image/grade_15.png'
import nineGrade from '../../image/pc_grade_19.png'
import caution from '../../image/caution_15_2.png'
import TheaterModal from './TheaterModal'
import Theater_fare from './Theater_fare';
import TheaterTime from './TheaterTime';
import TimeNothing from './TimeNothing';

const Theater_bottom = ({scheduleMap}) => {

    //console.log(scheduleMap) //map형태로 잘 왔는데

    const [activeButton,setActiveButton] = useState('btn_screen_time')
    const [date,setDate] = useState(new Date().toISOString().split('T')[0]) // 초기값을 YYYY-MM-DD 형식으로 설정
    //date = button 날짜 
    const {fullDates,dates,months,weekdays} = DateList();
    const [isOpen,setIsOpen] = useState(false) //modal
    const [isGraySelected,setIsGraySelected] = useState(false) //회색 글자 선택하면 TimeNothing 띄우는 작업
    const [selectedDate,setSelectedDate] = useState(fullDates[0]) //선택한 날짜 css 추가

    const handleButton = (buttonname) => { //상영시간표/요금안내
        setActiveButton(buttonname)
    }

    function DateList () { //버튼의 날짜 띄우는 함수
        
            const today = new Date();
            const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

            const result = Array.from({ length: 13 }, (_, i) => {
                const date = new Date(today);
                date.setDate(today.getDate() + i);

                return {
                    fullDate: date.toISOString().split('T')[0], // YYYY-MM-DD 형식으로 변환하여 저장
                    date: String(date.getDate()),
                    month: String(date.getMonth() + 1),
                    weekday: daysOfWeek[date.getDay()],
                };
            });

        return {
            fullDates: result.map(item => item.fullDate), // 전체 날짜 리스트
            dates: result.map(item => item.date),
            months: result.map(item => item.month),
            weekdays: result.map(item => item.weekday),
        };

    }    

    const filteredSchedulesMap = new Map();

    if(scheduleMap && scheduleMap instanceof Map){
        
        scheduleMap.forEach((schedules,created)=>{           
            if(created === date){
                filteredSchedulesMap.set(date,schedules)
            }
        })

    }else{
        console.log("scheduleMap이 map이 아니야")
    }

    const handleDate = (selectedDate) => {  
        const hasSchedules = 
        Array.from(scheduleMap.keys()).some(created => {            
            return created === selectedDate
        })
        //선택한 날짜에 스케쥴이 있는지 확인

       setIsGraySelected(!hasSchedules)
       setDate(selectedDate)
        setSelectedDate(selectedDate)
    }

    const openModal = () => {        
        setIsOpen(true)        
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div className='theater_bottom_wrap'>
                    <div className='theater_bottom_top_wrap'>
                        <button 
                            className={`btn ${activeButton === 'btn_screen_time' ? 'active' : ''}`} 
                            onClick={()=>handleButton('btn_screen_time')}>상영 시간표                            
                        </button>
                        
                        <button 
                            className= {`btn ${activeButton === 'btn_fare_info' ? 'active' : ''}`} 
                            onClick={()=>handleButton('btn_fare_info')}>요금 안내                            
                        </button>
                        
                    </div>
                    <div className='theater_bottom_bottom_wrap'>
                        <div className={`time_table_wrap ${activeButton === 'btn_screen_time' ? 'active':''}`}>
                            <div className='date_select'>
                                <div className='date_slide'>
                                    {fullDates.map((fullDates,index) => (
                                        <button key={index} className={`date_item ${selectedDate === fullDates ? 'selected' : ''}`} onClick={()=>handleDate(fullDates)}>
                                            <span style={{color : index===0 ? 'black':'transparent',fontSize:'12px'}}>{months[index]}월</span>
                                            <span style={{color : !scheduleMap || !scheduleMap.has(fullDates) ? 'gray': (weekdays[index] === '토' ? 'blue' : weekdays[index] === '일' ? 'red' : 'black')}}>
                                                {dates[index]}
                                            </span>
                                            <span style={{color : !scheduleMap || !scheduleMap.has(fullDates) ? 'gray': (weekdays[index] === '토' ? 'blue' : weekdays[index] === '일' ? 'red' : 'black'),
                                                fontSize:'12px'
                                            }}>
                                                {weekdays[index]}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className='movie_grade_wrap'>
                                <span className='txt_grade'><img src={allGrade} alt='description'/>전체 관람가</span>
                                <span className='txt_grade'><img src={twoGrade} alt='description'/>12세 관람가</span>
                                <span className='txt_grade'><img src={fiveGrade} alt='description'/>15세 관람가</span>
                                <span className='txt_grade'><img src={nineGrade} alt='description'/>19세 관람가</span>
                                <button type='button' className='btn_txt_grade' onClick={openModal}><img src={caution} alt='grade'/>관람등급안내</button>                                
                            {
                                isOpen && <TheaterModal closeModal={closeModal}/>
                            }
                            </div>
                            <div className='time_scroll_wrap'>
                                { isGraySelected ? <TimeNothing/>: <TheaterTime scheduleMap={filteredSchedulesMap}/> }                                
                            </div>
                        </div>
                        <div className={`fare_info_wrap ${activeButton === 'btn_fare_info' ? 'active':''}`}>
                            <Theater_fare/>
                        </div>
                    </div>
        </div>
    );
};

export default Theater_bottom;