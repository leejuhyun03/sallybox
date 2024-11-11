import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/ticketing/TicketingCinema.css';

const TicketingCinema = ({ setSelectedCinema }) => {
    const [activeTab, setActiveTab] = useState('전체'); // '전체' 또는 '스페셜관'을 위한 탭 상태
    const [selectedCinema, setSelectedCinemaState] = useState(null); // 선택된 영화관
    const [cinemaList, setCinemaList] = useState([]); // 영화관 목록
    const [activeRegion, setActiveRegion] = useState('서울'); // 현재 활성 지역 상태
    
    useEffect(()=>{
        fetchCinemasByRegion(activeRegion)
    },[])

    // 동적으로 "region" 값을 받아 영화관 목록을 서버에서 가져오는 함수
    const fetchCinemasByRegion = async (region) => { //region = cinema
        setActiveRegion(region); // 지역 상태 업데이트
        try {
            const response = await axios.get(`/sallybox/reserv/cinemas/${region}`);
            setCinemaList(response.data); // 영화관 목록을 상태로 저장

            const defaultCinema = response.data.find(cinema => cinema.name === '가산디지털')
            if(defaultCinema){
                handleCinemaClick(defaultCinema)
            }else if(response.data.length>0){
                handleCinemaClick(response.data[0]);
            }
        } catch (error) {
            console.error("영화관 목록을 불러오는데 실패했습니다:", error);
        }
    };

    // 영화관 선택 시 상태 업데이트 및 상위 컴포넌트에 선택 영화관 전달
    const handleCinemaClick = (cinema) => {
        setSelectedCinemaState(cinema);
        setSelectedCinema(cinema); // 상위 컴포넌트에 전달
    };

    return (
        <div>
            {/* 탭 버튼 */}
            <div className='jycinema_area_inner'>
                <button 
                    type="button" 
                    className={`jytab_tit ${activeTab === '전체' ? 'jyactive' : ''}`} 
                    onClick={() => setActiveTab('전체')}
                >
                    전체
                </button>
                <button 
                    type="button" 
                    className={`jytab_tit ${activeTab === '스페셜관' ? 'jyactive' : ''}`} 
                    onClick={() => setActiveTab('스페셜관')}
                >
                    스페셜관
                </button>
            </div>

            {/* 전체 탭 콘텐츠 */}
            {activeTab === '전체' && (
                <div className='jycontent_row'>
                    {/* 서울 버튼 */}
                    <div className='jyregion_button'>
                        <button 
                            type="button" 
                            onClick={() => fetchCinemasByRegion('서울')}
                            className={activeRegion === '서울' ? 'jyactive-button' : ''} // 클릭된 상태 유지
                        >
                            서울
                        </button>
                    </div>

                    {/* 지역 리스트 */}
                    <div className='jyregion_list'>
                        {cinemaList.map(cinema => (
                            <li 
                                key={cinema.cinema_id}
                                className={`jycinema_item ${selectedCinema === cinema ? 'jyselected' : ''}`}
                                onClick={() => handleCinemaClick(cinema)}
                            >
                                {cinema.name}
                            </li>
                        ))}
                    </div>
                </div>
            )}

            {/* 스페셜관 탭 콘텐츠 */}
            {activeTab === '스페셜관' && (
                <div className='jycontent_row'>
                    {/* 샤롯데 버튼 */}
                    <div className='jyregion_button'>
                        <button 
                            type="button" 
                            onClick={() => fetchCinemasByRegion('샤롯데')}
                            className={activeRegion === '샤롯데' ? 'jyactive-button' : ''} // 클릭된 상태 유지
                        >
                            샤롯데
                        </button>
                    </div>

                    {/* 지역 리스트 */}
                    <div className='jyregion_list'>
                        {cinemaList.map(cinema => (
                            <li 
                                key={cinema.cinema_id}
                                className={`jycinema_item ${selectedCinema === cinema ? 'jyselected' : ''}`}
                                onClick={() => handleCinemaClick(cinema)}
                            >
                                {cinema.name}
                            </li>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketingCinema;
