import React, { useEffect, useState } from 'react';
import LeftHeader from '../seats/LeftHeader';
import '../../css/seats/LeftHeader.css';
import '../../css/seats/Reservation.css';
import '../../css/ticketing/Ticketing.css';
import '../../css/ticketing/TicketingCinema.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TicketingCinema from './TicketingCinema';
import TicketingMovie from './TicketingMovie';

const Ticketing = () => {
    const [selectedCinema, setSelectedCinema] = useState(null); // 선택된 영화관
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // 오늘 날짜 설정
    const { cinema_id } = useParams(); // URL에서 cinema_id를 가져와 변수로 설정
    const [cinemaDTO, setCinemaDTO] = useState(null);
    const [scheduleMap, setScheduleMap] = useState(new Map());
    const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 저장 상태

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie); // 선택된 영화를 업데이트
    };

    useEffect(() => {
        console.log("선택된 영화관:", selectedCinema);
    }, [selectedCinema]);

    // cinema_id를 URL로 가져와서 해당 영화관의 정보를 API로 요청하고, 그 결과로 cinemaDTO와 schedules 데이터를 받아옴
    // setCinemaDTO와 setScheduleMap을 통해 상태로 저장
    useEffect(() => {
        if (cinema_id) {
            axios
                .get(`http://localhost:8085/sallybox/cinemajy/${cinema_id}`)
                .then((response) => {
                    // response가 DTO 형태 (cinemaDTO, Map<Integer, List<ScheduleDTO>>)
                    setCinemaDTO(response.data.cinemaDTO);

                    // object 형태로 넘어온 걸 map 형태로 변환 (map이 Object(배열) 형태로 넘어옴)
                    if (response.data.schedules) {
                        const scheduleMap = new Map(Object.entries(response.data.schedules));
                        setScheduleMap(scheduleMap);
                    } else {
                        console.warn('schedules is undefined or null');
                        setScheduleMap(new Map()); // 빈 Map으로 설정하거나 다른 기본값 설정
                    }
                })
                .catch((err) => {
                    console.log('cinemaDTO 받는데 실패', err.response ? err.response.data : err);
                });
        }
    }, [cinema_id]);

    if (!cinemaDTO || !scheduleMap) {
        <p>Loading....</p>;
    }

    return (
        <div className="reserve_wrap">
            <div className="left_reserv_wrap">
                <LeftHeader />
            </div>
            <div className="center_reserv_wrap">
                <div className="jycinema_all">
                    <div className="jycinema_area" style={{ width: '351px', height: '870px' }}>
                        <div className="group_top">
                            <h4 className="cinema_title" style={{ textAlign: 'center' }}>
                                {selectedCinema ? selectedCinema.name : '영화관 선택'}
                            </h4>
                            {/* 선택한 영화관의 이름을 띄워야함 */}
                        </div>

                        {/* TicketingCinema 컴포넌트 */}
                        <TicketingCinema setSelectedCinema={setSelectedCinema} />
                    </div>

                    <div
                        className="jycinema_movie_schedule"
                        style={{ backgroundColor: '#dddddd', display: 'flex', width: '851px', height: '870px' }}
                    >
                        <TicketingMovie
                            cinemaId={selectedCinema ? selectedCinema.cinema_id : null} // 상영관 클릭하면 상영 영화 가져옴
                            selectedDate={selectedDate}
                            onMovieSelect={handleMovieSelect} // `onMovieSelect`를 prop으로 전달
                            scheduleMap={scheduleMap}
                            setSelectedCinema={setSelectedCinema}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticketing;
