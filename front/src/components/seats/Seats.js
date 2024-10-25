import React, { useState } from 'react';
import '../../css/seats/Seats.css'

const Seats = ({seats,counts}) => {

    const [selectedSeats,setSelectedSeats] = useState([])

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

    const handleButton = (seat) => {

        const totalpeople = counts.adult + counts.teenager + counts.senior + counts.disabled

        if(totalpeople===0){
            alert('인원수를 선택하세요')
            return
        }
        // 예약된 좌석은 선택할 수 없도록 한다.
        if (seat.status === 'yes') {
            return;
        }
        if (selectedSeats.includes(seat.seat_id)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seat.seat_id));
        } else if (selectedSeats.length < totalpeople) {
            setSelectedSeats([...selectedSeats, seat.seat_id]);
        }

    }

    return (
        <div className='show_seats_wrap'>
            {
                [...groupedSeats.entries()].map(([row,seatsInRow])=>(
                    <div key={row} className='seat_in_row'>
                        <span>{row}</span>
                        {
                            seatsInRow.map(seat => (
                                <button key={seat.seat_id} 
                                    className={`seat_btn ${selectedSeats.includes(seat.seat_id) ? 'seat_btn_selected':''}
                                    ${seat.status === 'yes' ? 'seat_btn_reserved' : ''}
                                    ${selectedSeats.length >= 
                                        counts.adult + counts.teenager + counts.senior + counts.disabled && !selectedSeats.includes(seat.seat_id) 
                                        ? 'seat_btn_disabled' : ''}`} 
                                    onClick={()=>handleButton(seat)}>
                                    {seat.num}
                                </button>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default Seats;