import React, { useContext, useEffect, useState } from 'react';
import '../../css/seats/Seats.css'
import BookingContext from '../BookingContext';
import AlertModal from './AlertModal';

const Seats = ({seats,counts}) => {

    const [selectedSeats,setSelectedSeats] = useState([])
    const {setBookingData} = useContext(BookingContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    //seat을 열 별로 map형태로 만들기
    const groupedSeatsByRow = (seats) => {
        const groupedSeats = new Map();
        seats.forEach(seat => {
            if (!groupedSeats.has(seat.seat_row)) {
                groupedSeats.set(seat.seat_row, []);
            }
            groupedSeats.get(seat.seat_row).push(seat);
        });
        return groupedSeats;
    }

    const groupedSeats = groupedSeatsByRow(seats)    

    //seat 버튼 선택시 
    const handleButton = (seat) => {

        const totalpeople = counts.adult + counts.teenager + counts.senior + counts.disabled

         // 예약된 좌석은 선택할 수 없도록 한다.
         if (seat.status === 'yes') {
            setModalMessage('이미 예약된 좌석입니다.')
            setIsModalOpen(true)
            return;
        }

        if(totalpeople===0){
            setModalMessage('인원수를 선택하세요');
            setIsModalOpen(true);
            return
        }
       
        //장애인 인원이 없을 경우 휠체어 좌석 선택 방지
        if (counts.disabled === 0 && seat.seat_type === '휠체어') {
            setModalMessage('휠체어 좌석은 선택할 수 없습니다.')
            setIsModalOpen(true)
            return;
        }

        let updatedSelectedSeats

        //장애인 석 처리
        if(seat.seat_type==='휠체어'){
            const selectedDisabledSeats = selectedSeats.filter ( s => s.seat_type === '휠체어').length

            if(selectedDisabledSeats >= counts.disabled && !selectedSeats.some(selected => selected.seat_id===seat.seat_id)){
                setModalMessage(`장애인 석은 최대 ${counts.disabled}개만 선택할 수 있습니다.`)
                setIsModalOpen(true)
                return
            }
        }else{
            //일반석 처리
            const selectedNonDisabledSeats = selectedSeats.filter(s => s.seat_type !== '휠체어').length;

            if (selectedNonDisabledSeats >= totalPeople && !selectedSeats.some(selected => selected.seat_id === seat.seat_id)) {
                setModalMessage(`일반 좌석은 최대 ${totalPeople}개만 선택할 수 있습니다.`);
                setIsModalOpen(true);
                return;
            }
        }

        //count의 선택 수 보다 작게 선택 할 수 있게
        if (selectedSeats.some(selected => selected.seat_id === seat.seat_id)) {
            updatedSelectedSeats = selectedSeats.filter(selected => selected.seat_id !== seat.seat_id);
        } else if (selectedSeats.length < totalpeople) {
            updatedSelectedSeats = [...selectedSeats, seat];
        }else{
            setModalMessage(`좌석은 최대 ${totalPeople}개만 선택할 수 있습니다.`);
            setIsModalOpen(true);
            return
        }

        setSelectedSeats(updatedSelectedSeats)
        
        setBookingData(prevData => ({
            ...prevData,
            selectedSeats: updatedSelectedSeats
        }));

    }

    // **추가된 부분: counts가 변경될 때 선택된 좌석을 초기화**
    useEffect(() => {
        setSelectedSeats([]); // 인원수 변경 시 선택된 좌석 초기화
    }, [counts]);
    // ***************************************************

    const totalPeople = counts.adult + counts.teenager + counts.senior + counts.disabled;

    return (
        <div className='show_seats_wrap'>
            {
                [...groupedSeats.entries()].map(([row,seatsInRow])=>(
                    <div key={row} className='seat_in_row'>
                        <span>{row}</span>
                        {
                            seatsInRow.map(seat => (

                                seat.seat_type === 'aisle' ? (
                                    <div key={`aisle-${seat.seat_id}`} className='aisle'></div>
                                )
                                : 
                                seat.seat_type === '휠체어' ? (
                                    <button key={seat.seat_id} className={`seat_btn
                                    ${selectedSeats.some(selected=>selected.seat_id === seat.seat_id) ? 'seat_btn_selected':''}
                                    ${seat.status === 'yes' ? 'seat_btn_reserved' : ''}
                                    ${counts.disabled > 0 && seat.seat_type=== '휠체어' ? 'seat_btn_wheelchair':''}
                                    ${counts.disabled === 0 && seat.seat_type === '휠체어' ? 'seat_btn_disabled' : ''}
                                    ${totalPeople > 0 && selectedSeats.length >= totalPeople && !selectedSeats.some(selected => selected.seat_id === seat.seat_id) ? 'seat_btn_disabled' : ''}
                                    `} onClick={()=>handleButton(seat)}>
                                        {seat.num}
                                    </button>
                                )
                                :
                                <button key={seat.seat_id} 
                                    className={`seat_btn 
                                        ${totalPeople > 0 && selectedSeats.some(selected => selected.seat_id === seat.seat_id) ? 
                                            'seat_btn_selected' : ''}
                                        ${seat.status === 'yes' ? 'seat_btn_reserved' : ''}
                                        ${totalPeople > 0 && selectedSeats.length >= totalPeople && 
                                            !selectedSeats.some(selected => selected.seat_id === seat.seat_id)
                                            ? 'seat_btn_disabled' : ''}
                                        `} 
                                    onClick={()=>handleButton(seat)}>
                                    {seat.num}
                                </button>
                            ))
                        }
                    </div>
                ))
            }
            {
                isModalOpen && <AlertModal onClose={()=>setIsModalOpen(false)} message={modalMessage}/>
            }
        </div>
    );
};

export default Seats;